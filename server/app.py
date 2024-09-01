from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from datetime import datetime
from models import db, Owner, Pet, Worker, Groomer, Appointment, Job

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/owners', methods=['GET', 'POST'])
def owners():
    if request.method == 'GET':
        owners = Owner.query.all()
        return make_response(
            jsonify([owner.to_dict() for owner in owners]),
            200,
        )
    elif request.method == 'POST':
        data = request.get_json()
        new_owner = Owner(
            username=data.get('username'),
            password=data.get('password'),
        )
        db.session.add(new_owner)
        db.session.commit()
        return make_response(new_owner.to_dict(), 201)

@app.route('/owners/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def owner_by_id(id):
    owner = Owner.query.filter(Owner.id == id).first()

    if owner is None:
        response_body = {"message": "Owner not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(owner.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for attr, value in data.items():
            setattr(owner, attr, value)
        db.session.add(owner)
        db.session.commit()
        return make_response(owner.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(owner)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Owner deleted."
        }
        return make_response(response_body, 200)

@app.route('/pets', methods=['GET', 'POST'])
def pets():
    if request.method == 'GET':
        pets = Pet.query.all()
        return make_response(
            jsonify([pet.to_dict() for pet in pets]), 200
        )
    
    elif request.method == 'POST': #when adding a pet if there is no owner it breaks, make sure to add a default for the owner being none (need to add owner_id)
        data = request.get_json()

        owner_id = data.get('owner_id') or None

        new_pet = Pet(
            name=data.get('name'),
            breed=data.get('breed'),
            age=data.get('age'),
            owner_id=owner_id,
        )
        db.session.add(new_pet)
        db.session.commit()
        return make_response(new_pet.to_dict(), 201)

@app.route('/pets/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def pet_by_id(id):
    pet = Pet.query.filter(Pet.id == id).first()

    if pet is None:
        response_body = {"message": "Pet not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(pet.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for attr, value in data.items():
            setattr(pet, attr, value)
        db.session.add(pet)
        db.session.commit()
        return make_response(pet.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(pet)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Pet deleted."
        }
        return make_response(response_body, 200)

@app.route('/workers', methods=['GET', 'POST'])
def workers():
    if request.method == 'GET':
        workers = Worker.query.all()
        return make_response(
            jsonify([worker.to_dict() for worker in workers]), 200
        )
    
    elif request.method == 'POST':
        data = request.get_json()
        new_worker = Worker(
            username=data.get('username'),
            password=data.get('password'),
            pet_walker=data.get('pet_walker'),
            pet_sitter=data.get('pet_sitter'),
        )
        db.session.add(new_worker)
        db.session.commit()
        return make_response(new_worker.to_dict(), 201)

@app.route('/workers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def worker_by_id(id):
    worker = Worker.query.filter(Worker.id == id).first()

    if worker is None:
        response_body = {"message": "Worker not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(worker.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for attr, value in data.items():
            setattr(worker, attr, value)
        db.session.add(worker)
        db.session.commit()
        return make_response(worker.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(worker)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Worker deleted."
        }
        return make_response(response_body, 200)

@app.route('/groomers', methods=['GET', 'POST'])
def groomers():
    if request.method == 'GET':
        groomers = Groomer.query.all()
        return make_response(
            jsonify([groomer.to_dict() for groomer in groomers]), 200
        )
    
    elif request.method == 'POST':
        data = request.get_json()
        new_groomer = Groomer(
            business_name=data.get('business_name'),
            username=data.get('username'),
            password=data.get('password'),
            hours=data.get('hours'),
            address=data.get('address')
        )
        db.session.add(new_groomer)
        db.session.commit()
        return make_response(new_groomer.to_dict(), 201)

@app.route('/groomers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def groomer_by_id(id):
    groomer = Groomer.query.filter(Groomer.id == id).first()

    if groomer is None:
        response_body = {"message": "Groomer not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(groomer.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for attr, value in data.items():
            setattr(groomer, attr, value)
        db.session.add(groomer)
        db.session.commit()
        return make_response(groomer.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(groomer)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Groomer deleted."
        }
        return make_response(response_body, 200)

@app.route('/appointments', methods=['GET', 'POST'])
def appointments():
    if request.method == 'GET':
        appointments = Appointment.query.all()
        return make_response(
            jsonify([gp.to_dict() for gp in appointments]), 200
        )
    elif request.method == 'POST':
        data = request.get_json()
        try:
            new_appointment = Appointment(
                appointment_time=data.get('appointment_time'),
                service=data.get('service'),
                isCompleted=data.get('isCompleted'),
                groomer_id=data.get('groomer_id'),
                pet_id=data.get('pet_id'),
                owner_id=data.get('owner_id')
            )
            db.session.add(new_appointment)
            db.session.commit()
            return make_response(new_appointment.to_dict(), 201)
        except Exception as e:
            print(f"Error creating Appointment: {e}")
            return make_response(jsonify({"error": "An error occurred while creating the appointment"}), 500)



@app.route('/appointments/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def appointment_by_id(id):
    appointment = Appointment.query.filter(Appointment.id == id).first()

    if appointment is None:
        response_body = {"message": "Appointment not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(appointment.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        if 'appointment_time' in data:
            appointment_time = datetime.fromtimestamp(data['appointment_time'])
            appointment.appointment_time = appointment_time
        for attr, value in data.items():
            setattr(appointment, attr, value)
        db.session.add(appointment)
        db.session.commit()
        return make_response(appointment.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(appointment)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Appointment deleted."
        }
        return make_response(response_body, 200)

@app.route('/jobs', methods=['GET', 'POST'])
def jobs():
    if request.method == 'GET':
        jobs = Job.query.all()
        return make_response(
            jsonify([job.to_dict() for job in jobs]), 200
        )
    
    elif request.method == 'POST':
        data = request.get_json()

        #try:
        #    arrival_time = datetime.fromtimestamp(int(data.get('arrival_time')))
        #except (TypeError, ValueError) as e:
        #    return make_response(jsonify({"error": f"Invalid arrival_time format: {e}"}), 400)
        
        # Ensure all necessary data is present
        #required_fields = ['worker_id', 'pet_id', 'owner_id', 'job_type', 'isCompleted']
        #missing_fields = [field for field in required_fields if data.get(field) is None]
        
        #if missing_fields:
        #    return make_response(jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400)
        
        # Create new Job record
        try:
            new_job = Job(
                arrival_time=data.get('arrival_time'),
                isCompleted=data.get('isCompleted'),
                worker_id=data.get('worker_id'),
                pet_id=data.get('pet_id'),
                owner_id=data.get('owner_id'),
                job_type=data.get('job_type'),
            )
            db.session.add(new_job)
            db.session.commit()
            return make_response(new_job.to_dict(), 201)
        except Exception as e:
            # Log any exception that occurs
            print(f"Error creating Job: {e}")
            return make_response(jsonify({"error": "An error occurred while creating the job"}), 500)

@app.route('/jobs/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def job_by_id(id):
    job = Job.query.filter(Job.id == id).first()

    if job is None:
        response_body = {"message": "Job not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(job.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        if 'arrival_time' in data:
            arrival_time = datetime.fromtimestamp(data['arrival_time'])
            job.arrival_time = arrival_time
        for attr, value in data.items():
            setattr(job, attr, value)
        db.session.add(job)
        db.session.commit()
        return make_response(job.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(job)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Job deleted."
        }
        return make_response(response_body, 200)

if __name__ == "__main__":
    app.run(port=5555, debug=True)
