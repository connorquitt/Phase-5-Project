import datetime
from app import app
from models import db, Owner, Pet, Worker, Groomer, GroomerPet, WorkerPet

with app.app_context():

    # Delete all rows in tables
    WorkerPet.query.delete()
    GroomerPet.query.delete()
    Groomer.query.delete()
    Worker.query.delete()
    Pet.query.delete()
    Owner.query.delete()
    db.session.commit()

    # Add owners
    owner1 = Owner(username='johndoe', password='password123')
    owner2 = Owner(username='janedoe', password='password456')
    owner3 = Owner(username='alice', password='alicepass')
    owner4 = Owner(username='bob', password='bobpass')
    owner5 = Owner(username='charlie', password='charliepass')
    owner6 = Owner(username='None', password='password')
    db.session.add_all([owner1, owner2, owner3, owner4, owner5, owner6])
    db.session.commit()

    # Add pets
    pet1 = Pet(name='Fido', breed='Labrador', age=3, owner=owner1)
    pet2 = Pet(name='Whiskers', breed='Siamese', age=2, owner=owner1)
    pet3 = Pet(name='Rex', breed='German Shepherd', age=4, owner=owner3)
    pet4 = Pet(name='Fluffy', breed='Persian', age=1, owner=owner4)
    pet5 = Pet(name='Spot', breed='Dalmatian', age=5, owner=owner5)
    db.session.add_all([pet1, pet2, pet3, pet4, pet5])
    db.session.commit()

    # Add workers
    unclaimed = Worker(username='unclaimed', password='password', pet_walker=True, pet_sitter=True)
    worker1 = Worker(username='Trooper', password='password', pet_walker=True, pet_sitter=False)
    worker2 = Worker(username='Jon', password='password', pet_walker=False, pet_sitter=True)
    worker3 = Worker(username='Delaney', password='password', pet_walker=True, pet_sitter=True)
    worker4 = Worker(username='Josh', password='password', pet_walker=False, pet_sitter=False)
    worker5 = Worker(username='Dalton', password='password', pet_walker=True, pet_sitter=True)
    db.session.add_all([unclaimed, worker1, worker2, worker3, worker4, worker5])
    db.session.commit()

    # Add groomers
    groomer1 = Groomer(username='Sydney', password='password', hours='9-5', address='123 Groomer Lane')
    groomer2 = Groomer(username='Anna', password='password', hours='10-6', address='456 Groomer St')
    groomer3 = Groomer(username='Brandon', password='password', hours='8-4', address='789 Groomer Blvd')
    groomer4 = Groomer(username='Brant', password='password', hours='7-3', address='101 Groomer Ave')
    groomer5 = Groomer(username='Ron', password='password', hours='11-7', address='202 Groomer Dr')
    db.session.add_all([groomer1, groomer2, groomer3, groomer4, groomer5])
    db.session.commit()

    # Add groomer-pet appointments
    gp1 = GroomerPet(appointment_time=int(datetime.datetime(2024, 8, 20, 14, 0).timestamp()), groomer=groomer1, pet=pet1)
    gp2 = GroomerPet(appointment_time=int(datetime.datetime(2024, 8, 21, 10, 0).timestamp()), groomer=groomer2, pet=pet2)
    gp3 = GroomerPet(appointment_time=int(datetime.datetime(2024, 8, 22, 11, 0).timestamp()), groomer=groomer3, pet=pet3)
    gp4 = GroomerPet(appointment_time=int(datetime.datetime(2024, 8, 23, 12, 0).timestamp()), groomer=groomer4, pet=pet4)
    gp5 = GroomerPet(appointment_time=int(datetime.datetime(2024, 8, 24, 15, 0).timestamp()), groomer=groomer5, pet=pet5)
    db.session.add_all([gp1, gp2, gp3, gp4, gp5])
    db.session.commit()

    # Add worker-pet appointments
    wp1 = WorkerPet(arrival_time=int(datetime.datetime(2024, 8, 25, 9, 0).timestamp()), worker=unclaimed, pet=pet1, job_type='pet_walker')
    wp2 = WorkerPet(arrival_time=int(datetime.datetime(2024, 8, 26, 10, 0).timestamp()), worker=unclaimed, pet=pet2, job_type='pet_walker')
    wp3 = WorkerPet(arrival_time=int(datetime.datetime(2024, 8, 27, 11, 0).timestamp()), worker=worker3, pet=pet3, job_type='pet_walker')
    wp4 = WorkerPet(arrival_time=int(datetime.datetime(2024, 8, 28, 12, 0).timestamp()), worker=worker4, pet=pet4, job_type='pet_sitter')
    wp5 = WorkerPet(arrival_time=int(datetime.datetime(2024, 8, 29, 13, 0).timestamp()), worker=worker5, pet=pet5, job_type='pet_sitter')
    db.session.add_all([wp1, wp2, wp3, wp4, wp5])
    db.session.commit()
