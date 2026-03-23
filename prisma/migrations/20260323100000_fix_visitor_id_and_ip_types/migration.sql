ALTER TABLE "visits" DROP CONSTRAINT "visits_visitor_id_fkey";

ALTER TABLE "visitors"
  ALTER COLUMN "visitor_id" TYPE VARCHAR(64) USING "visitor_id"::text;

ALTER TABLE "visits"
  ALTER COLUMN "visitor_id" TYPE VARCHAR(64) USING "visitor_id"::text,
  ALTER COLUMN "ip_address" TYPE VARCHAR(64) USING host("ip_address");

ALTER TABLE "visits"
  ADD CONSTRAINT "visits_visitor_id_fkey"
  FOREIGN KEY ("visitor_id") REFERENCES "visitors"("visitor_id")
  ON DELETE CASCADE ON UPDATE CASCADE;
