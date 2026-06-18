-- Enable the PostGIS extension for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUMS
CREATE TYPE user_role AS ENUM ('Reporter', 'Volunteer', 'NGO', 'Veterinarian', 'Admin');
CREATE TYPE case_status AS ENUM ('Reported', 'Accepted', 'Volunteer En Route', 'Reached Location', 'Animal Stabilized', 'Transport Arranged', 'At Vet', 'Closed');

-- USERS TABLE
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'Reporter',
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CASES TABLE
CREATE TABLE public.cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_number TEXT UNIQUE NOT NULL,
    reporter_id UUID REFERENCES public.users(id),
    animal_type TEXT NOT NULL,
    severity TEXT NOT NULL,
    status case_status NOT NULL DEFAULT 'Reported',
    photo_url TEXT,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    address TEXT,
    assigned_volunteer UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VOLUNTEERS TABLE
CREATE TABLE public.volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) UNIQUE NOT NULL,
    current_location GEOGRAPHY(POINT, 4326),
    is_available BOOLEAN DEFAULT true,
    verification_status TEXT DEFAULT 'Pending',
    last_location_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active_case_id UUID REFERENCES public.cases(id)
);

-- ADD FOREIGN KEY TO CASES NOW THAT VOLUNTEERS EXISTS
ALTER TABLE public.cases ADD CONSTRAINT fk_assigned_volunteer FOREIGN KEY (assigned_volunteer) REFERENCES public.volunteers(id);

-- NGOS TABLE
CREATE TABLE public.ngos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    coverage_radius INTEGER NOT NULL DEFAULT 5 -- in kilometers
);

-- VETERINARIANS TABLE
CREATE TABLE public.veterinarians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    clinic_name TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    available BOOLEAN DEFAULT true
);

-- TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cases_updated_at
    BEFORE UPDATE ON public.cases
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- INDEXES FOR GEOSPATIAL QUERIES
CREATE INDEX cases_location_idx ON public.cases USING GIST (location);
CREATE INDEX volunteers_location_idx ON public.volunteers USING GIST (current_location);
CREATE INDEX ngos_location_idx ON public.ngos USING GIST (location);
CREATE INDEX vets_location_idx ON public.veterinarians USING GIST (location);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.veterinarians ENABLE ROW LEVEL SECURITY;

-- DEFAULT POLICIES (Allow all for development, refine later)
CREATE POLICY "Allow public read access to users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to users" ON public.users FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to cases" ON public.cases FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to cases" ON public.cases FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to cases" ON public.cases FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to volunteers" ON public.volunteers FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to volunteers" ON public.volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to volunteers" ON public.volunteers FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to ngos" ON public.ngos FOR SELECT USING (true);
CREATE POLICY "Allow public read access to veterinarians" ON public.veterinarians FOR SELECT USING (true);

-- CONTACT QUERIES TABLE
CREATE TABLE public.contact_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_type TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.contact_queries ENABLE ROW LEVEL SECURITY;

-- DEFAULT POLICIES (Allow public insert)
CREATE POLICY "Allow public insert access to contact_queries" ON public.contact_queries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access to contact_queries" ON public.contact_queries FOR SELECT USING (true);
