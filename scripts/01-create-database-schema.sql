-- Creating comprehensive database schema for maintenance cost prediction system

-- Users table for authentication and user management
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle makes and models reference data
CREATE TABLE IF NOT EXISTS vehicle_makes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicle_models (
    id SERIAL PRIMARY KEY,
    make_id INTEGER REFERENCES vehicle_makes(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    year_start INTEGER,
    year_end INTEGER,
    engine_type VARCHAR(50),
    fuel_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Main vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    vin VARCHAR(17) UNIQUE,
    make_id INTEGER REFERENCES vehicle_makes(id),
    model_id INTEGER REFERENCES vehicle_models(id),
    year INTEGER NOT NULL,
    mileage INTEGER DEFAULT 0,
    engine_size DECIMAL(3,1),
    fuel_type VARCHAR(50),
    transmission VARCHAR(50),
    color VARCHAR(50),
    purchase_price DECIMAL(12,2),
    current_value DECIMAL(12,2),
    condition_rating INTEGER CHECK (condition_rating BETWEEN 1 AND 10),
    owner_name VARCHAR(255),
    owner_contact VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'sold', 'maintenance', 'retired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Maintenance categories and types
CREATE TABLE IF NOT EXISTS maintenance_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    priority_level INTEGER DEFAULT 1 CHECK (priority_level BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS maintenance_types (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES maintenance_categories(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    typical_interval_miles INTEGER,
    typical_interval_months INTEGER,
    estimated_duration_hours DECIMAL(4,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Historical maintenance records
CREATE TABLE IF NOT EXISTS maintenance_records (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
    maintenance_type_id INTEGER REFERENCES maintenance_types(id),
    service_date DATE NOT NULL,
    mileage_at_service INTEGER,
    cost DECIMAL(10,2) NOT NULL,
    labor_cost DECIMAL(10,2),
    parts_cost DECIMAL(10,2),
    service_provider VARCHAR(255),
    notes TEXT,
    warranty_months INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cost prediction models and factors
CREATE TABLE IF NOT EXISTS cost_factors (
    id SERIAL PRIMARY KEY,
    factor_name VARCHAR(100) NOT NULL UNIQUE,
    factor_type VARCHAR(50) NOT NULL, -- 'vehicle_age', 'mileage', 'make', 'model', 'maintenance_type'
    base_multiplier DECIMAL(5,4) DEFAULT 1.0000,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Predicted maintenance costs
CREATE TABLE IF NOT EXISTS maintenance_predictions (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
    maintenance_type_id INTEGER REFERENCES maintenance_types(id),
    predicted_date DATE,
    predicted_mileage INTEGER,
    predicted_cost DECIMAL(10,2),
    confidence_score DECIMAL(3,2) CHECK (confidence_score BETWEEN 0 AND 1),
    factors_used JSONB, -- Store which factors influenced the prediction
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System settings and configuration
CREATE TABLE IF NOT EXISTS system_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
