CREATE TABLE IF NOT EXISTS users
(
    uuid VARCHAR(50) NOT NULL PRIMARY KEY,
    pseudo VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    picture VARCHAR(255) DEFAULT "default_profile_pic.png",
    pwd VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS colocs
(
    uuid VARCHAR(50) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(50) NOT NULL,
    post_code INT NOT NULL,
    town VARCHAR(255) NOT NULL,
    picture VARCHAR(255) DEFAULT "default_profile_pic.png"
);

CREATE TABLE IF NOT EXISTS expenses(
    uuid VARCHAR(50) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    value BIGINT NOT NULL,
    category ENUM('Courses', 'Charges/Loyer', 'Soirees', 'Abonnements', 'Necessites', 'Autres'),
    type ENUM('Achat', 'Remboursement') NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    fix BOOLEAN DEFAULT '0',
    token VARCHAR(50) NOT NULL,
    user_uuid VARCHAR(50) NOT NULL,
    coloc_uuid VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users_colocs(
    uuid VARCHAR(50) NOT NULL PRIMARY KEY,
    user_uuid VARCHAR(50) NOT NULL,
    coloc_uuid VARCHAR(50) NOT NULL,
    admin BOOLEAN DEFAULT '0'
);

ALTER TABLE expenses ADD CONSTRAINT expense_user_uuid_foreign FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE;
ALTER TABLE expenses ADD CONSTRAINT expense_coloc_uuid_foreign FOREIGN KEY (`coloc_uuid`) REFERENCES `colocs`(`uuid`) ON DELETE CASCADE;
ALTER TABLE users_colocs ADD CONSTRAINT users_colocs_user_uuid_foreign FOREIGN KEY (`user_uuid`) REFERENCES `users`(`uuid`) ON DELETE CASCADE;
ALTER TABLE users_colocs ADD CONSTRAINT users_colocs_coloc_uuid_foreign FOREIGN KEY (`coloc_uuid`) REFERENCES `colocs`(`uuid`) ON DELETE CASCADE;

INSERT INTO users (uuid, pseudo, email, pwd) VALUES
('0e0d9f87-e5a4-46d0-bcde-a129940ef6c7', 'Jb', 'jb@mail.com', '$2y$10$jAteYHBYQTZhoffjp2kB..tD.oYf5f6pjZ26MuyzrvmjltYQwQq8O'),
('d2da2a15-b22c-4403-ad33-345f0f59ad03', 'Adrien', 'adrien@mail.com', '$2y$10$jAteYHBYQTZhoffjp2kB..tD.oYf5f6pjZ26MuyzrvmjltYQwQq8O'),
('9d5edd7a-0352-4ba8-9094-03b95a3a143e', 'Valentine', 'valentine@mail.com', '$2y$10$jAteYHBYQTZhoffjp2kB..tD.oYf5f6pjZ26MuyzrvmjltYQwQq8O'),
('6acea239-1568-4af7-8cf6-13f405c4cc31', 'Victorien', 'victorien@mail.com', '$2y$10$jAteYHBYQTZhoffjp2kB..tD.oYf5f6pjZ26MuyzrvmjltYQwQq8O'),
('3c85ac51-e769-4efb-bab9-9a5307f55014', 'Antho', 'antho@mail.com', '$2y$10$jAteYHBYQTZhoffjp2kB..tD.oYf5f6pjZ26MuyzrvmjltYQwQq8O'),
('24613cce-f7a4-41f0-bf6d-c318751f2d8d', 'pnj1', 'pnj1@mail.com', 'oui'),
('4aad1ecd-77cd-48cf-bbe1-b101868f69a8', 'pnj2', 'pnj2@mail.com', 'oui'),
('fd6519a7-90e1-4a70-9a49-95b28ccfe8ea', 'pnj3', 'pnj3@mail.com', 'oui');

INSERT INTO colocs (uuid, name, address, post_code, town) VALUES
('44a36f45-010f-4bf7-a7f0-8434108fecd6', 'Call Oc Duty', '27 Rue du Progrès', 93100, 'Montreuil'),
('42500393-9805-4bca-8b5d-03df0d297927', 'Back Ops II', '1 Rue Henri Guinier', 34000,'Montpellier');

INSERT INTO users_colocs (uuid, user_uuid, coloc_uuid, admin) VALUES
('0c6d5a7d-b681-458c-9717-40a4b5b53005', '0e0d9f87-e5a4-46d0-bcde-a129940ef6c7', '44a36f45-010f-4bf7-a7f0-8434108fecd6', 0),
('de8e1742-515e-4a91-be4b-f2e6485468e1', 'd2da2a15-b22c-4403-ad33-345f0f59ad03', '44a36f45-010f-4bf7-a7f0-8434108fecd6', 0),
('9c978da7-fd99-4146-8254-12605ff43e0c', '9d5edd7a-0352-4ba8-9094-03b95a3a143e', '44a36f45-010f-4bf7-a7f0-8434108fecd6', 0),
('3107ba10-a6be-4546-b5f9-1a96e5b3390a', '6acea239-1568-4af7-8cf6-13f405c4cc31', '44a36f45-010f-4bf7-a7f0-8434108fecd6', 1),
('3a5cc7a3-d68c-4dc2-b85f-15960cc713d1', '3c85ac51-e769-4efb-bab9-9a5307f55014', '44a36f45-010f-4bf7-a7f0-8434108fecd6', 0),
('901f5b0a-1795-4e44-b2ca-b8bf161fe2d4', '3c85ac51-e769-4efb-bab9-9a5307f55014', '42500393-9805-4bca-8b5d-03df0d297927', 0),
('c486d337-0f3e-49ac-9d62-58ed324058b9', '24613cce-f7a4-41f0-bf6d-c318751f2d8d', '42500393-9805-4bca-8b5d-03df0d297927', 0),
('105f7498-82e9-4ac0-932e-987af63a1b49', '4aad1ecd-77cd-48cf-bbe1-b101868f69a8', '42500393-9805-4bca-8b5d-03df0d297927', 1),
('96e48b2e-8e5b-40ec-9caa-0fa6c751aeb3', 'fd6519a7-90e1-4a70-9a49-95b28ccfe8ea', '42500393-9805-4bca-8b5d-03df0d297927', 0);

INSERT INTO expenses (uuid, name, value, category, type, fix, token, user_uuid, coloc_uuid) VALUES
('a027b779-9a3a-4607-870c-6644edddb4e5', 'Loyer', 400, 'Charges/Loyer', 'Achat', 1, '4b9122d3-bca0-43f5-804e-3a90399f43b5', '0e0d9f87-e5a4-46d0-bcde-a129940ef6c7', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('ba72304d-947d-45f6-9a35-ae53dbd1d72c', 'Loyer', -200, 'Charges/Loyer', 'Achat', 1, '4b9122d3-bca0-43f5-804e-3a90399f43b5', '0e0d9f87-e5a4-46d0-bcde-a129940ef6c7', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('2c9e9024-6281-4077-ba88-98a575e60293', 'Loyer', -200, 'Charges/Loyer', 'Achat', 1, '4b9122d3-bca0-43f5-804e-3a90399f43b5', 'd2da2a15-b22c-4403-ad33-345f0f59ad03', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('bd74eff9-272d-4d26-b7d9-eef68bfc1d2e', 'Eau', 120, 'Charges/Loyer', 'Achat', 1, '6a279017-7108-4221-83d6-2782fdd8a5fb', 'd2da2a15-b22c-4403-ad33-345f0f59ad03', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('4d6610b3-4b75-4997-bae1-4979aff30e88', 'Eau', -60, 'Charges/Loyer', 'Achat', 1, '6a279017-7108-4221-83d6-2782fdd8a5fb', 'd2da2a15-b22c-4403-ad33-345f0f59ad03', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('fd794240-c7f8-49a7-8e72-6724acf9e45a', 'Eau', -60, 'Charges/Loyer', 'Achat', 1, '6a279017-7108-4221-83d6-2782fdd8a5fb', '0e0d9f87-e5a4-46d0-bcde-a129940ef6c7', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('5ca7e5a0-0fb9-4f61-95e3-9f1453f21c1c', 'Cafe', 120, 'Autres', 'Achat', 0, '3da731bc-08ee-4876-8aa2-ed6d13897820', '9d5edd7a-0352-4ba8-9094-03b95a3a143e', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('994a05f5-c028-470d-abf9-c1c1cb02415f', 'Cafe', -60, 'Autres', 'Achat', 0, '3da731bc-08ee-4876-8aa2-ed6d13897820', '9d5edd7a-0352-4ba8-9094-03b95a3a143e', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('1a74c98e-ef7c-4033-80b4-dbc9ad701fa7', 'Cafe', -60, 'Autres', 'Achat', 0, '3da731bc-08ee-4876-8aa2-ed6d13897820', 'd2da2a15-b22c-4403-ad33-345f0f59ad03', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('c9a6f746-1e8b-48b6-a5d7-6b8c8b9a6d2f', 'Courses', 50, 'Courses', 'Achat', 0, '7c6d9f87-e5a4-46d0-bcde-a129940ef6c7', 'd2da2a15-b22c-4403-ad33-345f0f59ad03', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('3g2h1i0j-9k8l-7m6n-5o4p-3e2f1g0h9i8j', 'Courses', -25, 'Courses', 'Achat', 0, '7c6d9f87-e5a4-46d0-bcde-a129940ef6c7', 'd2da2a15-b22c-4403-ad33-345f0f59ad03', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('2h1i0j9k-8l7m-6n5o-4p3q-2f1g0h9i8j7k', 'Courses', -25, 'Courses', 'Achat', 0, '7c6d9f87-e5a4-46d0-bcde-a129940ef6c7', '9d5edd7a-0352-4ba8-9094-03b95a3a143e', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('e1b2c3d4-f5a6-47e8-b2c9-1d0e9f8g7h6i', 'Soirée', 20, 'Abonnements', 'Achat', 0, '8d5edd7a-0352-4ba8-9094-03b95a3a143e', '9d5edd7a-0352-4ba8-9094-03b95a3a143e', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('1i0j9k8l-7m6n-5o4p-3q2r-1g0h9i8j7k6l', 'Soirée', -10, 'Abonnements', 'Achat', 0, '8d5edd7a-0352-4ba8-9094-03b95a3a143e', '9d5edd7a-0352-4ba8-9094-03b95a3a143e', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('d1b2c3d4-f5a6-47e8-b2c9-1d0e9f8g7h6i', 'Soirée', -10, 'Abonnements', 'Achat', 0, '8d5edd7a-0352-4ba8-9094-03b95a3a143e', '3c85ac51-e769-4efb-bab9-9a5307f55014', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p', 'Abonnement', 30, 'Abonnements', 'Achat', 1, '3c85ac51-e769-4efb-bab9-9a5307f55014', '3c85ac51-e769-4efb-bab9-9a5307f55014', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('9e7d8f6c-5b4a-3c2d-1e0f-9a8b7c6d5e4f', 'Abonnement', -15, 'Abonnements', 'Achat', 1, '3c85ac51-e769-4efb-bab9-9a5307f55014', '3c85ac51-e769-4efb-bab9-9a5307f55014', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('8d7c6b5a-4e3f-2g1h-0i9j-8f7g6h5i4j3k', 'Abonnement', -15, 'Abonnements', 'Achat', 1, '3c85ac51-e769-4efb-bab9-9a5307f55014', '6acea239-1568-4af7-8cf6-13f405c4cc31', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('qrstuvwxyz-abcdefghij-klmnopqrst-uvwxyzabcd', 'Nécessités', 20, 'Abonnements', 'Achat', 0, '6acea239-1568-4af7-8cf6-13f405c4cc31', '6acea239-1568-4af7-8cf6-13f405c4cc31', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('7c6b5a4e-3g2h-1i0j-9k8l-7d6c5b4a3e2f', 'Nécessités', -10, 'Abonnements', 'Achat', 0, '6acea239-1568-4af7-8cf6-13f405c4cc31', '6acea239-1568-4af7-8cf6-13f405c4cc31', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('6b5a4e3g-2h1i-0j9k-8l7m-6c5b4a3e2f1g', 'Nécessités', -10, 'Abonnements', 'Achat', 0, '6acea239-1568-4af7-8cf6-13f405c4cc31', '3c85ac51-e769-4efb-bab9-9a5307f55014', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('1234567890-abcdefghij-klmnopqrst-uvwxyzabcd', 'Autres', 100, 'Autres', 'Achat', 0, '3c85ac51-e769-4efb-bab9-9a5307f55014', '3c85ac51-e769-4efb-bab9-9a5307f55014', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('5a4e3g2h-1i0j-9k8l-7m6n-5b4a3e2f1g0h', 'Autres', -50, 'Autres', 'Achat', 0, '3c85ac51-e769-4efb-bab9-9a5307f55014', '3c85ac51-e769-4efb-bab9-9a5307f55014', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('4e3g2h1i-0j9k-8l7m-6n5o-4a3e2f1g0h9i', 'Autres', -50, 'Autres', 'Achat', 0, '3c85ac51-e769-4efb-bab9-9a5307f55014', '9d5edd7a-0352-4ba8-9094-03b95a3a143e', '44a36f45-010f-4bf7-a7f0-8434108fecd6');


UPDATE colocs SET address = IFNULL(CONVERT(CONVERT(CONVERT(address USING latin1)USING binary)USING utf8),address);
UPDATE colocs SET town = IFNULL(CONVERT(CONVERT(CONVERT(town USING latin1)USING binary)USING utf8),town);
UPDATE users SET pseudo = IFNULL(CONVERT(CONVERT(CONVERT(pseudo USING latin1)USING binary)USING utf8),pseudo);
UPDATE expenses SET name = IFNULL(CONVERT(CONVERT(CONVERT(name USING latin1)USING binary)USING utf8),name);
UPDATE expenses SET category = IFNULL(CONVERT(CONVERT(CONVERT(category USING latin1)USING binary)USING utf8),category);
