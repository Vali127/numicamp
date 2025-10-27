//pour creer les tables orienter
CREATE TABLE orienter_pers(id_profil VARCHAR(15) NOT NULL,id_domaine VARCHAR(16) NOT NULL,FOREIGN KEY(id_profil) REFERENCES personne(id_profil),FOREIGN KEY(id_domaine) REFERENCES domaine(id_domaine));
CREATE TABLE orienter_org(id_profil VARCHAR(15) NOT NULL,id_domaine VARCHAR(16) NOT NULL,FOREIGN KEY(id_profil) REFERENCES organisation(id_profil),FOREIGN KEY(id_domaine) REFERENCES domaine(id_domaine));
