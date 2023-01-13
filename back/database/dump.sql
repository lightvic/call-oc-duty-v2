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
    category ENUM('Courses', 'Charges/Loyer', 'Soirées', 'Abonnements', 'Nécessités', 'Autres'),
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
('0e0d9f87-e5a4-46d0-bcde-a129940ef6c7', 'jb', 'jb@mail.com', 'oui'),
('d2da2a15-b22c-4403-ad33-345f0f59ad03', 'adrien', 'adrien@mail.com', 'oui'),
('9d5edd7a-0352-4ba8-9094-03b95a3a143e', 'valentine', 'valentine@mail.com', 'oui'),
('6acea239-1568-4af7-8cf6-13f405c4cc31', 'victorien', 'victorien@mail.com', 'oui'),
('3c85ac51-e769-4efb-bab9-9a5307f55014', 'antho', 'antho@mail.com', 'oui'),
('24613cce-f7a4-41f0-bf6d-c318751f2d8d', 'pnj1', 'pnj1@mail.com', 'oui'),
('4aad1ecd-77cd-48cf-bbe1-b101868f69a8', 'pnj2', 'pnj2@mail.com', 'oui'),
('fd6519a7-90e1-4a70-9a49-95b28ccfe8ea', 'pnj3', 'pnj3@mail.com', 'oui');

INSERT INTO colocs (uuid, name, address, post_code, town) VALUES
('44a36f45-010f-4bf7-a7f0-8434108fecd6',"call oc" , '27 Bis Rue du Progrès', 93100, 'Montreuil'),
('42500393-9805-4bca-8b5d-03df0d297927',"back ops" ,'1 Rue Henri Guinier', 34000,'Montpellier');

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

INSERT INTO expenses (uuid, name, value, category, type,  token, user_uuid, coloc_uuid) VALUES
('a027b779-9a3a-4607-870c-6644edddb4e5', 'Loyer', 400, 'Charges/Loyer', 'Achat', '4b9122d3-bca0-43f5-804e-3a90399f43b5', '0e0d9f87-e5a4-46d0-bcde-a129940ef6c7', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('bd74eff9-272d-4d26-b7d9-eef68bfc1d2e', 'Eau', 40, 'Charges/Loyer', 'Achat', '6a279017-7108-4221-83d6-2782fdd8a5fb', 'd2da2a15-b22c-4403-ad33-345f0f59ad03', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('5ca7e5a0-0fb9-4f61-95e3-9f1453f21c1c', 'Electricité', 120, 'Charges/Loyer', 'Achat', '3da731bc-08ee-4876-8aa2-ed6d13897820', '9d5edd7a-0352-4ba8-9094-03b95a3a143e', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('945c35f1-5881-4e20-807b-0670af2f0b52', 'Courses', 140, 'Courses', 'Achat', 'b3ae7896-7e64-4bc7-be03-991faf4339a7', '24613cce-f7a4-41f0-bf6d-c318751f2d8d', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('2e67070b-43f7-4205-a6a2-465fd4da337f', 'Café', 600, 'Autres', 'Remboursement', 'd027877f-d1fa-4ff6-81f1-62b464c50f5f', '6acea239-1568-4af7-8cf6-13f405c4cc31', '44a36f45-010f-4bf7-a7f0-8434108fecd6'),
('0723b25d-1475-41d8-ad4b-40573cc518f9', 'Courses', 100, 'Courses', 'Achat', '454268a0-ce06-49db-a86c-96e644dcaabb', 'fd6519a7-90e1-4a70-9a49-95b28ccfe8ea', '42500393-9805-4bca-8b5d-03df0d297927'),
('5203f2ca-5e01-41b9-a53c-9f25df1d5fe0', 'Eau', 30, 'Charges/Loyer', 'Remboursement', 'a2189fda-3072-4c6e-87ee-fe282a69b109', '4aad1ecd-77cd-48cf-bbe1-b101868f69a8', '42500393-9805-4bca-8b5d-03df0d297927'),
('1b04defd-4030-4ba6-8385-f7924219f647', 'Loyer', 300, 'Charges/Loyer', 'Achat', '4e1f8b2d-1e3d-433c-a5b5-e98ab54a2972', '3c85ac51-e769-4efb-bab9-9a5307f55014', '42500393-9805-4bca-8b5d-03df0d297927');

UPDATE colocs SET address = IFNULL(CONVERT(CONVERT(CONVERT(address USING latin1)USING binary)USING utf8),address);
UPDATE colocs SET town = IFNULL(CONVERT(CONVERT(CONVERT(town USING latin1)USING binary)USING utf8),town);
UPDATE users SET pseudo = IFNULL(CONVERT(CONVERT(CONVERT(pseudo USING latin1)USING binary)USING utf8),pseudo);
UPDATE expenses SET name = IFNULL(CONVERT(CONVERT(CONVERT(name USING latin1)USING binary)USING utf8),name);
UPDATE expenses SET category = IFNULL(CONVERT(CONVERT(CONVERT(category USING latin1)USING binary)USING utf8),category);
