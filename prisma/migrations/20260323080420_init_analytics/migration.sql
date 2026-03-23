-- CreateTable
CREATE TABLE "visitors" (
    "id" BIGSERIAL NOT NULL,
    "visitor_id" UUID NOT NULL,
    "first_visit" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_visit" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "visit_count" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" BIGSERIAL NOT NULL,
    "visitor_id" UUID NOT NULL,
    "ip_address" INET NOT NULL,
    "app_version" VARCHAR(20),
    "user_agent" TEXT,
    "language" VARCHAR(32),
    "country_code" CHAR(2),
    "city" VARCHAR(100),
    "region" VARCHAR(100),
    "isp" VARCHAR(255),
    "organization" VARCHAR(255),
    "industrial_zone" VARCHAR(255),
    "source_path" VARCHAR(255),
    "project_slug" VARCHAR(100),
    "is_bot" BOOLEAN NOT NULL DEFAULT false,
    "is_repeat" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ip_enrichment" (
    "id" BIGSERIAL NOT NULL,
    "keyword" VARCHAR(255) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "country_code" CHAR(2),
    "province" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ip_enrichment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "version_snapshots" (
    "id" BIGSERIAL NOT NULL,
    "app_version" VARCHAR(20) NOT NULL,
    "deployed_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_visits" BIGINT NOT NULL DEFAULT 0,
    "unique_visitors" BIGINT NOT NULL DEFAULT 0,
    "industrial_visits" BIGINT NOT NULL DEFAULT 0,
    "by_country" JSONB,
    "top_industries" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "version_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "visitors_visitor_id_key" ON "visitors"("visitor_id");

-- CreateIndex
CREATE INDEX "idx_visitors_created_at" ON "visitors"("created_at");

-- CreateIndex
CREATE INDEX "idx_visits_visitor_id" ON "visits"("visitor_id");

-- CreateIndex
CREATE INDEX "idx_visits_app_version" ON "visits"("app_version");

-- CreateIndex
CREATE INDEX "idx_visits_industrial_zone" ON "visits"("industrial_zone");

-- CreateIndex
CREATE INDEX "idx_visits_country_code" ON "visits"("country_code");

-- CreateIndex
CREATE INDEX "idx_visits_project_slug" ON "visits"("project_slug");

-- CreateIndex
CREATE INDEX "idx_visits_created_at" ON "visits"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "ip_enrichment_keyword_key" ON "ip_enrichment"("keyword");

-- CreateIndex
CREATE INDEX "idx_ip_enrichment_category" ON "ip_enrichment"("category");

-- CreateIndex
CREATE UNIQUE INDEX "version_snapshots_app_version_key" ON "version_snapshots"("app_version");

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "visitors"("visitor_id") ON DELETE CASCADE ON UPDATE CASCADE;
