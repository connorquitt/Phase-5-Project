from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)

    pets = db.relationship('Pet', back_populates='owner')
    jobs = db.relationship('Job', back_populates='owner')


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'pets': [pet.to_dict() for pet in self.pets],
            'jobs': [job.to_dict() for job in self.jobs],

        }
    
    def __repr__(self):
        return f'<Owner id: {self.id}, username: {self.username}, password: {self.password}>'
    

    @validates('username')
    def validate_username(self, key, username):
        if not isinstance(username, str):
            raise ValueError('Invalid username')
        if len(username) < 3:
            raise ValueError('Username must be at least 3 characters long')
        return username

    @validates('password')
    def validate_password(self, key, password):
        if not isinstance(password, str):
            raise ValueError('Invalid password')
        if len(password) < 6:
            raise ValueError('Password must be at least 6 characters long')
        return password
    


class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    serialize_rules = ('-appointments.pets', '-jobs.pets',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    breed = db.Column(db.String)
    age = db.Column(db.Integer)
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))

    owner = db.relationship('Owner', back_populates='pets')

    appointments = db.relationship('Appointment', back_populates='pet')
    jobs = db.relationship('Job', back_populates='pet')

    def to_dict(self):
        return {
            'id': self.id,
            'owner': self.owner.username, #when adding a pet if there is no owner it breaks, make sure to add a default for the owner being none (need to add owner_id)
            'name': self.name,
            'breed': self.breed,
            'age': self.age,
        }
    
    def __repr__(self):
        return f'<Pet id: {self.id}, name: {self.name}, breed: {self.breed}, age: {self.age}>'
    

    @validates('name')
    def validate_name(self, key, name):
        if not isinstance(name, str):
            raise ValueError('Invalid name')
        return name

    @validates('breed')
    def validate_breed(self, key, breed):
        if not isinstance(breed, str):
            raise ValueError('Invalid breed')
        return breed

    @validates('age')
    def validate_age(self, key, age):
        if not isinstance(age, int) or age < 0:
            raise ValueError('Invalid age')
        return age



class Worker(db.Model, SerializerMixin):
    __tablename__ = 'workers'
    serialize_rules = ('-jobs.workers',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    pet_walker = db.Column(db.Boolean)
    pet_sitter = db.Column(db.Boolean)

    jobs = db.relationship('Job', back_populates='worker')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'pet_walker': self.pet_walker,
            'pet_sitter': self.pet_sitter,
        }
    
    def __repr__(self):
        return f'<Worker id: {self.id}, username: {self.username}, password: {self.password}, walker: {self.pet_walker}, sitter: {self.pet_sitter}>'
    

    @validates('username')
    def validate_username(self, key, username):
        if not isinstance(username, str):
            raise ValueError('Invalid username')
        if len(username) < 3:
            raise ValueError('Username must be at least 3 characters long')
        return username

    @validates('password')
    def validate_password(self, key, password):
        if not isinstance(password, str):
            raise ValueError('Invalid password')
        if len(password) < 6:
            raise ValueError('Password must be at least 6 characters long')
        return password

    @validates('pet_walker')
    def validate_pet_walker(self, key, pet_walker):
        if not isinstance(pet_walker, bool):
            raise ValueError('Pet walker must be a boolean')
        return pet_walker

    @validates('pet_sitter')
    def validate_pet_sitter(self, key, pet_sitter):
        if not isinstance(pet_sitter, bool):
            raise ValueError('Pet sitter must be a boolean')
        return pet_sitter



class Groomer(db.Model, SerializerMixin):
    __tablename__ = 'groomers'
    serialize_rules = ('-appointments.groomers',)

    id = db.Column(db.Integer, primary_key=True)
    business_name = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    hours = db.Column(db.String)
    address = db.Column(db.String)

    appointments = db.relationship('Appointment', back_populates='groomer')

    def to_dict(self):
        return {
            'id': self.id,
            'business_name': self.business_name,
            'username': self.username,
            'password': self.password,
            'hours': self.hours,
            'address': self.address,
        }
    
    def __repr__(self):
        return f'<Groomer id: {self.id}, business name: {self.business_name}, username: {self.username}, password: {self.password}, hours: {self.hours}, address: {self.address}>'
    

    @validates('username')
    def validate_username(self, key, username):
        if not isinstance(username, str):
            raise ValueError('Invalid username')
        if len(username) < 3:
            raise ValueError('Username must be at least 3 characters long')
        return username

    @validates('password')
    def validate_password(self, key, password):
        if not isinstance(password, str):
            raise ValueError('Invalid password')
        if len(password) < 6:
            raise ValueError('Password must be at least 6 characters long')
        return password

    @validates('hours')
    def validate_hours(self, key, hours):
        if not isinstance(hours, str):
            raise ValueError('Invalid hours')
        return hours

    @validates('address')
    def validate_address(self, key, address):
        if not isinstance(address, str):
            raise ValueError('Invalid address')
        return address
    
    @validates('business_name')
    def validates_business_name(self, key, name):
        if not isinstance(name, str):
            raise ValueError('Invalid business name')
        return name



class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'
    serialize_rules = ('-groomers.appointments', '-pets.appointments',)

    id = db.Column(db.Integer, primary_key=True)
    appointment_time = db.Column(db.String) #FIX
    service = db.Column(db.String)
    groomer_id = db.Column(db.Integer, db.ForeignKey('groomers.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))

    groomer = db.relationship('Groomer', back_populates='appointments') 
    pet = db.relationship('Pet', back_populates='appointments')
    def to_dict(self):
        return {
            'id': self.id,
            'appointment_time': self.appointment_time, #when adding an Appointment instance without appointment_time it will crash
            'service': self.service,
            'groomer_id': self.groomer_id, #when adding a Appointment instance without groomer_id it will crash
            'pet_id': self.pet_id,

            'groomer': self.groomer.username,
            'pet': self.pet.name,
        }
    
    def __repr__(self):
        return f'<Appointments id: {self.id}, appointment: {self.appointment_time}, groomer: {self.groomer}, pet: {self.pet}, service: {self.service}>'
    

    #@validates('appointment_time')
    #def validate_appointment_time(self, key, appointment_time):
    #    if not isinstance(appointment_time, str):
    #        raise ValueError('Invalid appointment time')
    #    return appointment_time

    @validates('service')
    def validate_service(self, key, service):
        if not isinstance(service, str):
            raise ValueError('Invalid Service')
        return service

    @validates('groomer_id')
    def validate_groomer_id(self, key, groomer_id):
        if not isinstance(groomer_id, int):
            raise ValueError('Invalid groomer ID')
        return groomer_id

    @validates('pet_id')
    def validate_pet_id(self, key, pet_id):
        if not isinstance(pet_id, int):
            raise ValueError('Invalid pet ID')
        return pet_id



class Job(db.Model, SerializerMixin):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    arrival_time = db.Column(db.String) #FIX
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))
    worker_id = db.Column(db.Integer, db.ForeignKey('workers.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    job_type = db.Column(db.String)

    worker = db.relationship('Worker', back_populates='jobs')
    pet = db.relationship('Pet', back_populates='jobs') #would like Job.pet to show more info than just the pet
    owner = db.relationship('Owner', back_populates='jobs')


    def to_dict(self):
        return {
            'id': self.id,
            'arrival_time': self.arrival_time, #when adding a Job instance without an arrival_time it will crash
            'worker_id': self.worker_id,
            'pet_id': self.pet_id,
            'owner_id': self.owner_id,
            'job_type': self.job_type,


            'worker': self.worker.username, #when adding a Job instance without a worker_id it will crash
            'pet': self.pet.name, #when adding a Job instance without a pet_id it will crash
            
        }

    def __repr__(self):
        return f'<Job id: {self.id}, arrival_time: {self.arrival_time}, worker: {self.worker}, pet: {self.pet}>'
    

    #@validates('arrival_time')
    #def validate_arrival_time(self, key, arrival_time):
    #    if not isinstance(arrival_time, int):
    #        raise ValueError('Arrival time must be an integer')
    #    if arrival_time < 0:
    #       raise ValueError('Arrival time must be a non-negative integer')
    #    return arrival_time
    
    #@validates('worker_id')
    #def validate_worker_id(self, key, worker_id):
    #    if not isinstance(worker_id, int):
    #        raise ValueError('Worker ID must be an integer')
    #   return worker_id
    
    #@validates('pet_id')
    #def validate_pet_id(self, key, pet_id):
    #    if not isinstance(pet_id, int):
    #        raise ValueError('Pet ID must be an integer')
    #    return pet_id