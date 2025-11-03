//pour la date creation
ALTER TABLE publication MODIFY date_pub TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

//pour la date expiration
DELIMITER //

CREATE TRIGGER set_date_expiration_before_insert
    BEFORE INSERT ON publication
    FOR EACH ROW
BEGIN
    IF NEW.date_expiration IS NULL THEN
    SET NEW.date_expiration = DATE_ADD(NOW(), INTERVAL 30 DAY);
END IF;
END //
DELIMITER ;


//pour la photo de publication
ALTER TABLE publication
    ADD COLUMN photo_pub VARCHAR(255) NULL AFTER description_pub;




//pour la nouvelle table orienter
CREATE TABLE abonner (
    id_profil_pers VARCHAR(15) NOT NULL,
    id_profil_org VARCHAR(15) NOT NULL,
    FOREIGN KEY (id_profil_pers) REFERENCES personne(id_profil) ON DELETE CASCADE,
    FOREIGN KEY (id_profil_org) REFERENCES organisation(id_profil) ON DELETE CASCADE
);

ALTER TABLE abonner
ADD CONSTRAINT unique_abonnement UNIQUE (id_profil_pers, id_profil_org);

//pour la modif trigger publication
DROP TRIGGER before_insert_publication;

DELIMITER //
CREATE TRIGGER before_insert_publication BEFORE INSERT ON publication FOR EACH ROW BEGIN   SET NEW.id_pub = CONCAT('PUB-',LEFT(REPLACE(UUID(),'-',''),12));   SET
@last_id_pub := NEW.id_pub; END//

//pour la modif trigger mot_cle
DROP TRIGGER before_insert_mot_cle;

DELIMITER //
CREATE TRIGGER before_insert_mot_cle BEFORE INSERT ON mot_cle FOR EACH ROW BEGIN   SET NEW.id_mot_cle = CONCAT('MCL-',LEFT(REPLACE(UUID(),'-',''),12));   SET @last_mot_cle := NEW.id_mot_cle; END//
