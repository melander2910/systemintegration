-- Users table
CREATE TABLE Users (
    Id SERIAL PRIMARY KEY,
    Firstname TEXT,
    Lastname TEXT,
    Email TEXT
);

-- Clients table
CREATE TABLE Clients (
    Id SERIAL PRIMARY KEY,
    Firstname TEXT NOT NULL,
    Lastname TEXT NOT NULL,
    PhoneNumber TEXT NOT NULL,
    Email TEXT NOT NULL,
    CompanyName TEXT DEFAULT '' NOT NULL
);

-- ClientUser table
CREATE TABLE ClientUser (
    ClientsId INT NOT NULL,
    UsersId INT NOT NULL,
    PRIMARY KEY (ClientsId, UsersId),
    FOREIGN KEY (ClientsId) REFERENCES Clients (Id) ON DELETE CASCADE,
    FOREIGN KEY (UsersId) REFERENCES Users (Id) ON DELETE CASCADE
);

-- Index on UsersId in ClientUser table
CREATE INDEX IX_ClientUser_UsersId ON ClientUser(UsersId);

-- WebhookRegistrations table
CREATE TABLE WebhookRegistrations (
    Id SERIAL PRIMARY KEY,
    Url TEXT NOT NULL,
    ContentType TEXT NOT NULL,
    Secret TEXT NOT NULL,
    EventType TEXT NOT NULL
);

-- TimeTrackings table
CREATE TABLE TimeTrackings (
    Id SERIAL PRIMARY KEY,
    UserId INT NOT NULL,
    StartDate TIMESTAMPTZ NOT NULL,
    EndDate TIMESTAMPTZ NOT NULL,
    Title TEXT,
    Description TEXT,
    ClientId INT NOT NULL,
    FOREIGN KEY (ClientId) REFERENCES Clients (Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users (Id) ON DELETE CASCADE
);

-- Index on UserId in TimeTrackings table
CREATE INDEX IX_TimeTrackings_UserId ON TimeTrackings(UserId);

-- Index on ClientId in TimeTrackings table
CREATE INDEX IX_TimeTrackings_ClientId ON TimeTrackings(ClientId);



