-- This file can be used to populate an initial dataset on startup if desired

CREATE TABLE birthdays (
  [name] varchar(50),
  [birthday] Date
  );

  INSERT INTO birthdays (name, birthday)
  VALUES
	('Cass', '2018-09-18T00:00:00.000Z'),
	('Owen', '2020-03-09T00:00:00.000Z'),
	('Troy', '2020-07-07T00:00:00.000Z'),
	('Trevor', '2020-11-29T00:00:00.000Z'),
	('Finley', '2021-08-25T00:00:00.000Z');