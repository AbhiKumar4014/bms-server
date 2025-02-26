BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[attachments] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__attachments__id__18EBB532] DEFAULT newid(),
    [entity_type] NVARCHAR(50) NOT NULL,
    [entity_id] UNIQUEIDENTIFIER NOT NULL,
    [file_name] NVARCHAR(255) NOT NULL,
    [file_path] NVARCHAR(500) NOT NULL,
    [uploaded_by] UNIQUEIDENTIFIER NOT NULL,
    [uploaded_at] DATETIME CONSTRAINT [DF__attachmen__uploa__1AD3FDA4] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__attachme__3213E83FD0A23DF5] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[audit_logs] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__audit_logs__id__245D67DE] DEFAULT newid(),
    [entity_type] NVARCHAR(50) NOT NULL,
    [entity_id] UNIQUEIDENTIFIER NOT NULL,
    [action] NVARCHAR(50) NOT NULL,
    [performed_by] UNIQUEIDENTIFIER NOT NULL,
    [performed_at] DATETIME CONSTRAINT [DF__audit_log__perfo__2739D489] DEFAULT CURRENT_TIMESTAMP,
    [changes] NVARCHAR(max),
    CONSTRAINT [PK__audit_lo__3213E83F4C6CCB91] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[clients] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__clients__id__4AB81AF0] DEFAULT newid(),
    [company_name] NVARCHAR(255) NOT NULL,
    [client_type] NVARCHAR(255) NOT NULL,
    [pan_number] NVARCHAR(50) NOT NULL,
    [is_active] BIT NOT NULL,
    [contact_person] NVARCHAR(255) NOT NULL,
    [mailing_country] NVARCHAR(100) NOT NULL,
    [mailing_street] NVARCHAR(255) NOT NULL,
    [mailing_city] NVARCHAR(100) NOT NULL,
    [mailing_state] NVARCHAR(100) NOT NULL,
    [mailing_zip_code] NVARCHAR(50) NOT NULL,
    [mailing_phone] NVARCHAR(50),
    [mailing_mobile] NVARCHAR(50),
    [mailing_fax] NVARCHAR(50),
    [mailing_email] NVARCHAR(255) NOT NULL,
    [same_as_mailing] BIT NOT NULL,
    [billing_attention] NVARCHAR(255),
    [billing_country] NVARCHAR(100),
    [billing_street] NVARCHAR(255),
    [billing_city] NVARCHAR(100),
    [billing_state] NVARCHAR(100),
    [billing_zip_code] NVARCHAR(50),
    [billing_phone] NVARCHAR(50),
    [billing_mobile] NVARCHAR(50),
    [billing_fax] NVARCHAR(50),
    [billing_email] NVARCHAR(255),
    [created_at] DATETIME CONSTRAINT [DF__clients__created__4D94879B] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF__clients__updated__4E88ABD4] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__clients__3213E83F3CE5380E] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ__clients__9C445950BF443DAC] UNIQUE NONCLUSTERED ([pan_number])
);

-- CreateTable
CREATE TABLE [dbo].[departments] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__departments__id__619B8048] DEFAULT newid(),
    [name] NVARCHAR(255) NOT NULL,
    [description] NVARCHAR(500),
    [created_at] DATETIME CONSTRAINT [DF__departmen__creat__628FA481] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF__departmen__updat__6383C8BA] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__departme__3213E83F22BA3634] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ__departme__72E12F1B96190285] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[employee_details] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__employee_det__id__339FAB6E] DEFAULT newid(),
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    [emp_id] NVARCHAR(50) NOT NULL,
    [first_name] NVARCHAR(100) NOT NULL,
    [last_name] NVARCHAR(100) NOT NULL,
    [department_id] UNIQUEIDENTIFIER,
    [designation] NVARCHAR(100),
    [date_of_joining] DATE,
    [date_of_birth] DATE,
    [phone] NVARCHAR(20),
    [mobile] NVARCHAR(20),
    [status] NVARCHAR(50) CONSTRAINT [DF__employee___statu__3587F3E0] DEFAULT 'active',
    [updated_at] DATETIME CONSTRAINT [DF__employee___updat__367C1819] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__employee__3213E83F9A21632D] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ__employee__B9BE370E5024E68E] UNIQUE NONCLUSTERED ([user_id]),
    CONSTRAINT [UQ__employee__1299A860B3E4EF35] UNIQUE NONCLUSTERED ([emp_id])
);

-- CreateTable
CREATE TABLE [dbo].[notifications] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__notification__id__1EA48E88] DEFAULT newid(),
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    [message] NVARCHAR(500) NOT NULL,
    [is_read] BIT CONSTRAINT [DF__notificat__is_re__1F98B2C1] DEFAULT 0,
    [created_at] DATETIME CONSTRAINT [DF__notificat__creat__208CD6FA] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__notifica__3213E83FA12F5CE0] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[project_managers] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__project_mana__id__01142BA1] DEFAULT newid(),
    [project_id] UNIQUEIDENTIFIER NOT NULL,
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    [department_id] UNIQUEIDENTIFIER NOT NULL,
    [consultant_id] UNIQUEIDENTIFIER,
    [primary_contact_first_name] NVARCHAR(100) NOT NULL,
    [primary_contact_last_name] NVARCHAR(100) NOT NULL,
    [primary_contact_email] NVARCHAR(255) NOT NULL,
    [primary_contact_mobile] NVARCHAR(20),
    [primary_contact_phone] NVARCHAR(20),
    [document_path] NVARCHAR(500),
    [assigned_at] DATETIME CONSTRAINT [DF__project_m__assig__02084FDA] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF__project_m__updat__02FC7413] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__project___3213E83FBDA22E04] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ__project___DBDFFF4164199B32] UNIQUE NONCLUSTERED ([primary_contact_email])
);

-- CreateTable
CREATE TABLE [dbo].[projects] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__projects__id__440B1D61] DEFAULT newid(),
    [project_code] NVARCHAR(255) NOT NULL,
    [project_name] NVARCHAR(255) NOT NULL,
    [project_description] TEXT NOT NULL,
    [planned_start_date] DATE NOT NULL,
    [planned_end_date] DATE NOT NULL,
    [revised_planned_end_date] DATE,
    [actual_start_date] DATE,
    [actual_end_date] DATE,
    [contracted_efforts] NVARCHAR(255),
    [planned_efforts] NVARCHAR(255),
    [po_number] NVARCHAR(255),
    [po_amount] NVARCHAR(255),
    [currency] NVARCHAR(50),
    [po_start_date] DATE,
    [po_end_date] DATE,
    [po_validity] NVARCHAR(255),
    [po_upliftment_details] NVARCHAR(max),
    [comments] NVARCHAR(max),
    [status] NVARCHAR(50) NOT NULL,
    [created_at] DATETIME CONSTRAINT [DF__projects__create__45F365D3] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF__projects__update__46E78A0C] DEFAULT CURRENT_TIMESTAMP,
    [client_id] UNIQUEIDENTIFIER,
    CONSTRAINT [PK__projects__3213E83F637E45CF] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ__projects__891B3A6FE4D9F817] UNIQUE NONCLUSTERED ([project_code])
);

-- CreateTable
CREATE TABLE [dbo].[task_assignments] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__task_assignm__id__5AEE82B9] DEFAULT newid(),
    [task_id] UNIQUEIDENTIFIER NOT NULL,
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    [assigned_at] DATETIME CONSTRAINT [DF__task_assi__assig__5BE2A6F2] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__task_ass__3213E83FAA01D450] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[task_status_history] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__task_status___id__2B0A656D] DEFAULT newid(),
    [task_id] UNIQUEIDENTIFIER NOT NULL,
    [status] NVARCHAR(50) NOT NULL,
    [changed_by] UNIQUEIDENTIFIER NOT NULL,
    [changed_at] DATETIME CONSTRAINT [DF__task_stat__chang__2CF2ADDF] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__task_sta__3213E83FAEBC2D57] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[tasks] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__tasks__id__52593CB8] DEFAULT newid(),
    [project_id] UNIQUEIDENTIFIER NOT NULL,
    [title] NVARCHAR(255) NOT NULL,
    [description] TEXT NOT NULL,
    [status] NVARCHAR(50) NOT NULL,
    [priority] NVARCHAR(50) NOT NULL,
    [assigned_to] UNIQUEIDENTIFIER,
    [estimated_hours] DECIMAL(5,2),
    [start_date] DATE,
    [due_date] DATE,
    [created_at] DATETIME CONSTRAINT [DF__tasks__created_a__5535A963] DEFAULT CURRENT_TIMESTAMP,
    [updated_at] DATETIME CONSTRAINT [DF__tasks__updated_a__5629CD9C] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__tasks__3213E83F4A856E34] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[users] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__users__id__3E52440B] DEFAULT newid(),
    [name] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [password_hash] NVARCHAR(max) NOT NULL,
    [role] NVARCHAR(50) NOT NULL,
    [created_at] DATETIME CONSTRAINT [DF__users__created_a__403A8C7D] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK__users__3213E83FC589475B] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UQ__users__AB6E616403CAE597] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[work_logs] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [DF__work_logs__id__114A936A] DEFAULT newid(),
    [user_id] UNIQUEIDENTIFIER NOT NULL,
    [project_id] UNIQUEIDENTIFIER NOT NULL,
    [task_id] UNIQUEIDENTIFIER,
    [hours_worked] DECIMAL(5,2) NOT NULL,
    [work_date] DATE NOT NULL CONSTRAINT [DF__work_logs__work___1332DBDC] DEFAULT CURRENT_TIMESTAMP,
    [comments] NVARCHAR(255),
    CONSTRAINT [PK__work_log__3213E83FFF39462A] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[attachments] ADD CONSTRAINT [fk_attachments_user] FOREIGN KEY ([uploaded_by]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[audit_logs] ADD CONSTRAINT [fk_audit_logs_user] FOREIGN KEY ([performed_by]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employee_details] ADD CONSTRAINT [fk_employee_department] FOREIGN KEY ([department_id]) REFERENCES [dbo].[departments]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[employee_details] ADD CONSTRAINT [fk_employee_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[notifications] ADD CONSTRAINT [fk_notifications_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_managers] ADD CONSTRAINT [fk_pm_consultant] FOREIGN KEY ([consultant_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_managers] ADD CONSTRAINT [fk_pm_department] FOREIGN KEY ([department_id]) REFERENCES [dbo].[departments]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_managers] ADD CONSTRAINT [fk_pm_project] FOREIGN KEY ([project_id]) REFERENCES [dbo].[projects]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[project_managers] ADD CONSTRAINT [fk_pm_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[projects] ADD CONSTRAINT [fk_projects_client] FOREIGN KEY ([client_id]) REFERENCES [dbo].[clients]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task_assignments] ADD CONSTRAINT [fk_task_assignments_task] FOREIGN KEY ([task_id]) REFERENCES [dbo].[tasks]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task_assignments] ADD CONSTRAINT [fk_task_assignments_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task_status_history] ADD CONSTRAINT [fk_task_status_history_task] FOREIGN KEY ([task_id]) REFERENCES [dbo].[tasks]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[task_status_history] ADD CONSTRAINT [fk_task_status_history_user] FOREIGN KEY ([changed_by]) REFERENCES [dbo].[users]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tasks] ADD CONSTRAINT [fk_tasks_project] FOREIGN KEY ([project_id]) REFERENCES [dbo].[projects]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[tasks] ADD CONSTRAINT [fk_tasks_user] FOREIGN KEY ([assigned_to]) REFERENCES [dbo].[users]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_logs] ADD CONSTRAINT [fk_work_logs_project] FOREIGN KEY ([project_id]) REFERENCES [dbo].[projects]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_logs] ADD CONSTRAINT [fk_work_logs_task] FOREIGN KEY ([task_id]) REFERENCES [dbo].[tasks]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[work_logs] ADD CONSTRAINT [fk_work_logs_user] FOREIGN KEY ([user_id]) REFERENCES [dbo].[users]([id]) ON DELETE CASCADE ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
