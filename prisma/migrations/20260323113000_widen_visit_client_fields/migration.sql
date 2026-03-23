ALTER TABLE "visits"
  ALTER COLUMN "ip_address" TYPE TEXT USING "ip_address"::text,
  ALTER COLUMN "user_agent" TYPE TEXT USING "user_agent"::text,
  ALTER COLUMN "language" TYPE TEXT USING "language"::text,
  ALTER COLUMN "source_path" TYPE TEXT USING "source_path"::text;
