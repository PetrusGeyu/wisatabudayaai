from flask import Flask, request, jsonify, render_template
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from PIL import Image, ImageOps  # Tambahkan ImageOps untuk EXIF orientation
import numpy as np
import os
from flask_cors import CORS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'tmp'
model = None
CORS(app)  # Enable CORS for all routes

# Daftar kelas yang sesuai dengan model
CLASS_NAMES = [
    'Yogyakarta_Parang', 'JawaBarat_Megamendung', 'Yogyakarta_Kawung', 'Aceh_Pintu_Aceh',
    'Bali_Barong', 'Bali_Merong', 'DKI_Ondel_Ondel', 'JawaTimur_Pring', 'Kalimantan_Dayak',
    'Lampung_Gajah', 'Madura_Mataketeran', 'Maluku_Pala', 'NTB_Lumbung', 'Papua_Asmat',
    'Papua_Cendrawasih', 'Papua_Tifa', 'Solo_Parang', 'SulawesiSelatan_Lontara', 'SumateraBarat_Rumah_Minang',
    'SumateraUtara_Boraspati'
]

@app.route('/')
def home():
    return render_template('BatikDetector.jsx')

def load_ml_model():
    global model
    model = load_model('new-model.h5')
    model.input_shape  # Untuk memicu error jika ada masalah load model
    print("Model loaded successfully! Input shape:", model.input_shape)

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}

def process_image(file_stream):
    try:
        img = ImageOps.exif_transpose(Image.open(file_stream))
        if img.mode != 'RGB':
            img = img.convert('RGB')
        img = img.resize((150, 150))  # Konsisten dengan frontend
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0) / 255.0
        print("Processed image shape:", img_array.shape)
        return img_array
    except Exception as e:
        raise RuntimeError(f"Gagal memproses gambar: {str(e)}")

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    
    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    try:
        processed_img = process_image(file.stream)
        
        if processed_img.shape[1:3] != (150, 150):  # Konsisten dengan model
            raise ValueError(f"Invalid image shape: {processed_img.shape[1:3]}")
        
        predictions = model.predict(processed_img)
        
        results = [
            {
                "label": CLASS_NAMES[i],
                "probability": float(pred),
                "confidence": f"{pred*100:.2f}%"
            }
            for i, pred in enumerate(predictions[0])
        ]
        
        # Urutkan dari confidence tertinggi
        results.sort(key=lambda x: x['probability'], reverse=True)
        
        return jsonify({
            "status": "success",
            "predictions": results,
            "input_shape": processed_img.shape
        })
    
    except Exception as e:
        app.logger.error(f"Error: {str(e)}")
        return jsonify({
            "error": str(e),
            "solution": "Pastikan gambar berformat RGB dengan resolusi 150x150 pixel"
        }), 500

if __name__ == '__main__':
    load_ml_model()
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)