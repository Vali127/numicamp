-- pour la date de création : valeur par défaut CURRENT_TIMESTAMP
ALTER TABLE publication
  MODIFY date_pub TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- trigger pour fixer la date d'expiration si non fournie (30 jours après NOW)
DROP TRIGGER IF EXISTS set_date_expiration_before_insert;
DELIMITER $$
CREATE TRIGGER set_date_expiration_before_insert
BEFORE INSERT ON publication
FOR EACH ROW
BEGIN
  IF NEW.date_expiration IS NULL THEN
    SET NEW.date_expiration = DATE_ADD(NOW(), INTERVAL 30 DAY);
  END IF;
END$$
DELIMITER ;

-- ajout de la colonne photo de publication
ALTER TABLE publication
  ADD COLUMN photo_pub VARCHAR(255) NULL AFTER description_pub;

-- création de la table abonner avec contrainte unique
CREATE TABLE IF NOT EXISTS abonner (
  id_profil_pers VARCHAR(15) NOT NULL,
  id_profil_org  VARCHAR(15) NOT NULL,
  CONSTRAINT fk_abonner_personne FOREIGN KEY (id_profil_pers) REFERENCES personne(id_profil) ON DELETE CASCADE,
  CONSTRAINT fk_abonner_organisation FOREIGN KEY (id_profil_org)  REFERENCES organisation(id_profil) ON DELETE CASCADE,
  CONSTRAINT unique_abonnement UNIQUE (id_profil_pers, id_profil_org)
);

-- trigger pour génération d'id_pub
DROP TRIGGER IF EXISTS before_insert_publication;
DELIMITER $$
CREATE TRIGGER before_insert_publication
BEFORE INSERT ON publication
FOR EACH ROW
BEGIN
  SET NEW.id_pub = CONCAT('PUB-', LEFT(REPLACE(UUID(), '-', ''), 12));
  SET @last_id_pub := NEW.id_pub;
END$$
DELIMITER ;

-- trigger pour génération d'id_mot_cle
DROP TRIGGER IF EXISTS before_insert_mot_cle;
DELIMITER $$
CREATE TRIGGER before_insert_mot_cle
BEFORE INSERT ON mot_cle
FOR EACH ROW
BEGIN
  SET NEW.id_mot_cle = CONCAT('MCL-', LEFT(REPLACE(UUID(), '-', ''), 12));
  SET @last_mot_cle := NEW.id_mot_cle;
END$$
DELIMITER ;
