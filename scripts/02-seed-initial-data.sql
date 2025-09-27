-- Seeding initial data for the maintenance cost prediction system

-- Insert popular vehicle makes
INSERT INTO vehicle_makes (name, country) VALUES
('Toyota', 'Japan'),
('Honda', 'Japan'),
('Ford', 'USA'),
('Chevrolet', 'USA'),
('BMW', 'Germany'),
('Mercedes-Benz', 'Germany'),
('Audi', 'Germany'),
('Volkswagen', 'Germany'),
('Nissan', 'Japan'),
('Hyundai', 'South Korea'),
('Kia', 'South Korea'),
('Mazda', 'Japan'),
('Subaru', 'Japan'),
('Lexus', 'Japan'),
('Acura', 'Japan')
ON CONFLICT (name) DO NOTHING;

-- Insert maintenance categories
INSERT INTO maintenance_categories (name, description, priority_level) VALUES
('Engine', 'Engine-related maintenance and repairs', 5),
('Transmission', 'Transmission system maintenance', 5),
('Brakes', 'Brake system maintenance and safety', 5),
('Suspension', 'Suspension and steering components', 4),
('Electrical', 'Electrical system and components', 3),
('Cooling System', 'Radiator, coolant, and cooling components', 4),
('Fuel System', 'Fuel injection, filters, and fuel system', 3),
('Exhaust System', 'Exhaust pipes, catalytic converter, muffler', 2),
('Tires & Wheels', 'Tire replacement and wheel maintenance', 3),
('Body & Interior', 'Cosmetic and interior repairs', 1),
('Air Conditioning', 'HVAC system maintenance', 2),
('Routine Maintenance', 'Regular service items', 3)
ON CONFLICT (name) DO NOTHING;

-- Insert common maintenance types
INSERT INTO maintenance_types (category_id, name, description, typical_interval_miles, typical_interval_months, estimated_duration_hours) VALUES
-- Engine maintenance
((SELECT id FROM maintenance_categories WHERE name = 'Engine'), 'Oil Change', 'Regular engine oil and filter change', 5000, 6, 0.5),
((SELECT id FROM maintenance_categories WHERE name = 'Engine'), 'Spark Plug Replacement', 'Replace spark plugs', 30000, 36, 2.0),
((SELECT id FROM maintenance_categories WHERE name = 'Engine'), 'Air Filter Replacement', 'Replace engine air filter', 15000, 12, 0.5),
((SELECT id FROM maintenance_categories WHERE name = 'Engine'), 'Timing Belt Replacement', 'Replace timing belt', 80000, 96, 6.0),

-- Transmission
((SELECT id FROM maintenance_categories WHERE name = 'Transmission'), 'Transmission Fluid Change', 'Change transmission fluid', 30000, 24, 1.5),
((SELECT id FROM maintenance_categories WHERE name = 'Transmission'), 'Transmission Repair', 'Major transmission repair or rebuild', 150000, 120, 16.0),

-- Brakes
((SELECT id FROM maintenance_categories WHERE name = 'Brakes'), 'Brake Pad Replacement', 'Replace brake pads', 25000, 24, 2.0),
((SELECT id FROM maintenance_categories WHERE name = 'Brakes'), 'Brake Rotor Replacement', 'Replace brake rotors', 50000, 48, 3.0),
((SELECT id FROM maintenance_categories WHERE name = 'Brakes'), 'Brake Fluid Change', 'Replace brake fluid', 24000, 24, 1.0),

-- Routine Maintenance
((SELECT id FROM maintenance_categories WHERE name = 'Routine Maintenance'), 'Multi-Point Inspection', 'Comprehensive vehicle inspection', 10000, 12, 1.0),
((SELECT id FROM maintenance_categories WHERE name = 'Routine Maintenance'), 'Tire Rotation', 'Rotate tires for even wear', 8000, 6, 0.5),
((SELECT id FROM maintenance_categories WHERE name = 'Routine Maintenance'), 'Battery Replacement', 'Replace car battery', 60000, 48, 1.0);

-- Insert cost factors
INSERT INTO cost_factors (factor_name, factor_type, base_multiplier, description) VALUES
('Vehicle Age 0-2 years', 'vehicle_age', 0.8000, 'Newer vehicles typically cost less to maintain'),
('Vehicle Age 3-5 years', 'vehicle_age', 1.0000, 'Standard maintenance costs for mid-age vehicles'),
('Vehicle Age 6-10 years', 'vehicle_age', 1.3000, 'Older vehicles require more frequent maintenance'),
('Vehicle Age 10+ years', 'vehicle_age', 1.8000, 'Very old vehicles have significantly higher maintenance costs'),
('High Mileage (>100k)', 'mileage', 1.4000, 'High mileage vehicles need more maintenance'),
('Luxury Brand', 'make', 1.6000, 'Luxury vehicles have higher parts and labor costs'),
('Economy Brand', 'make', 0.9000, 'Economy vehicles typically have lower maintenance costs'),
('Hybrid/Electric', 'fuel_type', 1.2000, 'Specialized systems may cost more to maintain');

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description) VALUES
('company_name', 'Punchi Car Niwasa', 'string', 'Company name for the system'),
('default_labor_rate', '85.00', 'decimal', 'Default hourly labor rate in dollars'),
('prediction_confidence_threshold', '0.75', 'decimal', 'Minimum confidence score for predictions'),
('maintenance_reminder_days', '30', 'integer', 'Days before maintenance to send reminders'),
('currency_symbol', '$', 'string', 'Currency symbol for cost display');
