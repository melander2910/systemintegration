CREATE TABLE [dbo].[Users] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Firstname] NVARCHAR (MAX) NULL,
    [Lastname]  NVARCHAR (MAX) NULL,
    [Email]     NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);


CREATE TABLE [dbo].[Clients] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Firstname]   NVARCHAR (MAX) NOT NULL,
    [Lastname]    NVARCHAR (MAX) NOT NULL,
    [PhoneNumber] NVARCHAR (MAX) NOT NULL,
    [Email]       NVARCHAR (MAX) NOT NULL,
    [CompanyName] NVARCHAR (MAX) DEFAULT (N'') NOT NULL,
    CONSTRAINT [PK_Clients] PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [dbo].[ClientUser] (
    [ClientsId] INT NOT NULL,
    [UsersId]   INT NOT NULL,
    CONSTRAINT [PK_ClientUser] PRIMARY KEY CLUSTERED ([ClientsId] ASC, [UsersId] ASC),
    CONSTRAINT [FK_ClientUser_Clients_ClientsId] FOREIGN KEY ([ClientsId]) REFERENCES [dbo].[Clients] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ClientUser_Users_UsersId] FOREIGN KEY ([UsersId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_ClientUser_UsersId]
    ON [dbo].[ClientUser]([UsersId] ASC);


CREATE TABLE [dbo].[WebhookRegistrations] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Url]         NVARCHAR (MAX) NOT NULL,
    [ContentType] NVARCHAR (MAX) NOT NULL,
    [Secret]      NVARCHAR (MAX) NOT NULL,
    [EventType]   NVARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_WebhookRegistrations] PRIMARY KEY CLUSTERED ([Id] ASC)
);


CREATE TABLE [dbo].[TimeTrackings] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [UserId]      INT            NOT NULL,
    [StartDate]   DATETIME2 (7)  NOT NULL,
    [EndDate]     DATETIME2 (7)  NOT NULL,
    [Title]       NVARCHAR (MAX) NULL,
    [Description] NVARCHAR (MAX) NULL,
    [ClientId]    INT            NOT NULL,
    CONSTRAINT [PK_TimeTrackings] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_TimeTrackings_Clients_ClientId] FOREIGN KEY ([ClientId]) REFERENCES [dbo].[Clients] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_TimeTrackings_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_TimeTrackings_UserId]
    ON [dbo].[TimeTrackings]([UserId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_TimeTrackings_ClientId]
    ON [dbo].[TimeTrackings]([ClientId] ASC);


