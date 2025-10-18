USE numicamp;

ALTER TABLE personne 
ADD COLUMN photo_profil VARCHAR(255) DEFAULT NULL;

ALTER TABLE organisation 
ADD COLUMN photo_profil VARCHAR(255) DEFAULT NULL;
