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
