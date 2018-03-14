INSERT INTO vprasanja(vprasanje) VALUES ('Ali je danes padal dež?');
INSERT INTO vprasanja(vprasanje) VALUES ('Ali je danes topleje kot včeraj?');
INSERT INTO vprasanja(vprasanje) VALUES ('Ali si rabil 5 minut več kot je bilo napovedano?');
INSERT INTO vprasanja(vprasanje) VALUES ('Koliko minut si danes zamudil?');
INSERT INTO vprasanja(vprasanje) VALUES ('Koliko minut si stal v prometu?');
INSERT INTO vprasanja(vprasanje) VALUES ('Ali je ta cesta bila prevozna?');
INSERT INTO vprasanja(vprasanje) VALUES ('Koliko avtov si srečal po poti?');

INSERT INTO mozen_odgovor(tip_odgovora, vprasanje_id) VALUES('DA', 1), ('NE', 1);
INSERT INTO mozen_odgovor(tip_odgovora, vprasanje_id) VALUES('DA', 2), ('NE', 2);
INSERT INTO mozen_odgovor(tip_odgovora, vprasanje_id) VALUES('DA', 3), ('NE', 3);
INSERT INTO mozen_odgovor(tip_odgovora, vprasanje_id) VALUES('5', 4), ('10', 4), ('0', 4), ('20', 4), ('30', 4);
INSERT INTO mozen_odgovor(tip_odgovora, vprasanje_id) VALUES('5', 5), ('10', 5), ('0', 5), ('20', 5), ('30', 5);
INSERT INTO mozen_odgovor(tip_odgovora, vprasanje_id) VALUES('DA', 6), ('NE', 6);
INSERT INTO mozen_odgovor(tip_odgovora, vprasanje_id) VALUES('0', 7), ('1-2', 7), ('3-4', 7), ('5-10', 7), ('10+', 7);

INSERT INTO odgovori(odgovor, posodobljen_ob, ustvarjen_ob, vprasanje_id) VALUES ('DA', NOW(), NOW(), 1),('DA', NOW(), NOW(), 1),('NE', NOW(), NOW(), 1),('DA', NOW(), NOW(), 2),('NE', NOW(), NOW(), 3),('NE', NOW(), NOW(), 3),('0', NOW(), NOW(), 4),('5', NOW(), NOW(), 4),('5', NOW(), NOW(), 4),('0', NOW(), NOW(), 4),('0', NOW(), NOW(), 5),('20', NOW(), NOW(), 5),('30', NOW(), NOW(), 5),('10', NOW(), NOW(), 5),('NE', NOW(), NOW(), 6),('DA', NOW(), NOW(), 6),('1-2', NOW(), NOW(), 7),('0', NOW(), NOW(), 7),('5-10', NOW(), NOW(), 7),('10+', NOW(), NOW(), 7);
