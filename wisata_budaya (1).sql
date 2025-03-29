-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 29 Mar 2025 pada 21.33
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wisata_budaya`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `budaya`
--

CREATE TABLE `budaya` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `asal` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `budaya`
--

INSERT INTO `budaya` (`id`, `nama`, `asal`, `deskripsi`, `gambar`, `created_at`) VALUES
(2, 'Tari Kecak', 'Bali', 'Tari Kecak adalah tarian khas Bali yang bercerita tentang Ramayana.', 'https://example.com/tari-kecak.jpg', '2025-03-17 13:52:49');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`, `updated_at`) VALUES
(5, 'petrus', 'petrus@gmail.com', '123', '2025-03-28 14:13:04', '2025-03-28 14:13:04'),
(6, 'Petrus', 'petrus1@example.com', '$2b$10$lXffB.cdmm.Qbpv2Q1ikIO4rk40tCZU/FYMbT/Utktzf9qbYVOtQO', '2025-03-28 14:19:34', '2025-03-28 14:19:34'),
(7, 'Januari', 'user@gmail.com', '$2b$10$Z21fEH3cPqJgUiELIlr38O8pxYa.OMbwbIX8JSxF5/cjR/uzbAjiS', '2025-03-28 14:36:32', '2025-03-28 14:36:32'),
(10, 'Petrus', 'petrus@example.com', '$2b$10$R2lwb65YeBGfPLi.1tG12uCzrYXiX9xmtJN7pi.LuYpNP81fW9I.e', '2025-03-29 14:10:05', '2025-03-29 14:10:05'),
(12, 'Danu', 'user1@gmail.com', '$2b$10$OVYhbXV44x81gveQa37WfOwe7ZWRQzsaRDZY0lmyQ3AtnSwS7aU52', '2025-03-29 14:10:16', '2025-03-29 14:10:16'),
(13, 'pandu', 'geyu@gmail.com', '$2b$10$paDFzt.no4OqekAvs1f/Ku9BFTJFDevrQu1kB2d3vZ3MadjqO.xtO', '2025-03-29 14:15:29', '2025-03-29 14:15:29'),
(15, 'Danu', 'geyu1@gmail.com', '$2b$10$BwWvDtUZ/qD/jMdK3n6D0eaWb0tW/mU2dg4/Td6LGgkMojyX9ivTq', '2025-03-29 14:40:28', '2025-03-29 14:40:28'),
(16, 'Januari', 'user2@gmail.com', '$2b$10$iUaM5A4HmK3CzfNn1tuwu.h9JWoge8995d4zjw1UjhXWTnF8nlr5a', '2025-03-29 14:41:55', '2025-03-29 14:41:55'),
(17, 'petrus', 'petrus12@example.com', '$2b$10$vHkiR/OBbHj2o2YZoIqYPOHsjTaGrUxHzW7ZMGVYJBZEQQ3YzkYDi', '2025-03-29 14:43:37', '2025-03-29 14:43:37'),
(18, 'Petrus Hendrick Geyu', 'user22@gmail.com', '$2b$10$V/aXNPNaEiqm1WZkli789.4UpIsB7S/CJcfOqNsuoju68uvJ3AY4W', '2025-03-29 14:46:52', '2025-03-29 14:46:52'),
(19, 'Danu', 'user23@gmail.com', '$2b$10$JecVQ8lhzX2k0bO7FxJ0NuPd52smXyEunyV0f8z6Iv0CyKdfrDI72', '2025-03-29 14:52:16', '2025-03-29 14:52:16'),
(21, 'user', 'user222@gmail.com', '$2b$10$yC1BjfJaHH/z22fudECYA.ciGaHebKC3cybopecVq7zi8y.sicpeq', '2025-03-29 14:58:01', '2025-03-29 14:58:01'),
(22, 'Danu', 'user11@gmail.com', '$2b$10$z4NeK1bpAEBF13h4oJpizOYng4yYm4G1LEL7NtcOPQ/nHqCCRl2ly', '2025-03-29 17:15:02', '2025-03-29 17:15:02'),
(23, 'Petrus Hendrick Geyu', 'petrus2@gmail.com', '$2b$10$wFliv5i0S6GFKn.1AWQ2kuna1LYYOlfS7GWGLGXdwLVV1pms7aIOe', '2025-03-29 17:49:14', '2025-03-29 17:49:14'),
(24, 'Petrus Hendrick Geyu', 'petrus3@gmail.com', '$2b$10$QShXGcPwxO207YGkLRncnu5NqmBigZ3Frx.lzeQNY1QbV3sqFiLLy', '2025-03-29 17:54:04', '2025-03-29 17:54:04'),
(25, 'Danu', 'geyu3@gmail.com', '$2b$10$KaTvUCacub9ATLv7Hz4VJu5g49rZH9NB3CTy/FMGdXRdf/hK3pyIO', '2025-03-29 18:02:21', '2025-03-29 18:02:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `wisata`
--

CREATE TABLE `wisata` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `kota` varchar(255) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `rating` decimal(3,1) NOT NULL,
  `deskripsi` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `wisata`
--

INSERT INTO `wisata` (`id`, `nama`, `kota`, `jenis`, `rating`, `deskripsi`, `created_at`, `updated_at`, `user_id`) VALUES
(9, 'Fort Rotterdam', 'Makassar', 'Sejarah', 5.0, 'Benteng peninggalan kolonial Belanda yang masih terawat.', '2025-03-29 18:45:35', '2025-03-29 18:45:35', 6);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `budaya`
--
ALTER TABLE `budaya`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `wisata`
--
ALTER TABLE `wisata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`user_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `budaya`
--
ALTER TABLE `budaya`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `wisata`
--
ALTER TABLE `wisata`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `wisata`
--
ALTER TABLE `wisata`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
