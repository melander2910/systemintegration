\copy clients (Id, Firstname, Lastname, PhoneNumber, Email, CompanyName) FROM 'clients.csv' DELIMITER ',' CSV HEADER
\copy users (Id, Firstname, Lastname, Email) FROM 'users.csv' DELIMITER ',' CSV HEADER
\copy clientuser (ClientsId, UsersId) FROM 'clientUser.csv' DELIMITER ',' CSV HEADER
-- make sure to format time to match expected time format in postgresql
\copy timetrackings (Id, UserId, StartDate, EndDate, Title, Description, ClientId) FROM 'timetrackings.csv' DELIMITER ',' CSV HEADER
\copy webhookregistrations (Id, Url, ContentType, Secret, EventType) FROM 'webhookRegistrations.csv' DELIMITER ',' CSV HEADER