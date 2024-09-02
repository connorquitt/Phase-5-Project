import datetime
from app import app
from models import db, Owner, Pet, Worker, Groomer, Appointment, Job

with app.app_context():

    # Delete all rows in tables
    Job.query.delete()
    Appointment.query.delete()
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
    pet1 = Pet(name='Fido', breed='Tibetan Spaniel', age=3, owner=owner1)
    pet2 = Pet(name='Whiskers', breed='Grand Basset Griffon Vendéen', age=2, owner=owner1)
    pet3 = Pet(name='Rex', breed='Hanoverian Scenthound', age=4, owner=owner3)
    pet4 = Pet(name='Fluffy', breed='Border Collie', age=1, owner=owner4)
    pet5 = Pet(name='Spot', breed='Skye Terrier', age=5, owner=owner5)
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
    groomer1 = Groomer(business_name='Paws and Claws Grooming', username='pawsclaws123', password='password', hours='9-5', address='123 Groomer Lane')
    groomer2 = Groomer(business_name='Furry Friends Salon', username='furryfriendsgroom', password='password', hours='10-6', address='456 Groomer St')
    groomer3 = Groomer(business_name='Happy Tails Spa', username='happytailsspa', password='password', hours='8-4', address='789 Groomer Blvd')
    groomer4 = Groomer(business_name='Snazzy Paws Boutique', username='snazzypaw', password='password', hours='7-3', address='101 Groomer Ave')
    groomer5 = Groomer(business_name='Bark and Bathe', username='barkbathe', password='password', hours='11-7', address='202 Groomer Dr')
    db.session.add_all([groomer1, groomer2, groomer3, groomer4, groomer5])
    db.session.commit()

    # Add groomer-pet appointments
    appt1 = Appointment(appointment_time=int(datetime.datetime(2024, 8, 20, 14, 0).timestamp()), service='Cleaning', groomer=groomer1, pet=pet1, owner=owner1, isCompleted=False)
    appt2 = Appointment(appointment_time=int(datetime.datetime(2024, 8, 21, 10, 0).timestamp()), service='Nail Clipping', groomer=groomer2, pet=pet2, owner=owner1, isCompleted=True)
    appt3 = Appointment(appointment_time=int(datetime.datetime(2024, 8, 22, 11, 0).timestamp()), service='Cleaning', groomer=groomer3, pet=pet3, owner=owner3, isCompleted=False)
    appt4 = Appointment(appointment_time=int(datetime.datetime(2024, 8, 23, 12, 0).timestamp()), service='Nail Clipping', groomer=groomer4, pet=pet4, owner=owner4, isCompleted=False)
    appt5 = Appointment(appointment_time=int(datetime.datetime(2024, 8, 24, 15, 0).timestamp()), service='Cleaning', groomer=groomer5, pet=pet5, owner=owner5, isCompleted=False)
    db.session.add_all([appt1, appt2, appt3, appt4, appt5])
    db.session.commit()

    # Add worker-pet appointments
    job1 = Job(arrival_time=int(datetime.datetime(2024, 8, 25, 9, 0).timestamp()), worker=worker1, pet=pet1, job_type='pet_walker', owner=owner1, isCompleted=True)
    job2 = Job(arrival_time=int(datetime.datetime(2024, 8, 26, 10, 0).timestamp()), worker=unclaimed, pet=pet2, job_type='pet_walker', owner=owner1, isCompleted=True)
    job3 = Job(arrival_time=int(datetime.datetime(2024, 8, 27, 11, 0).timestamp()), worker=worker3, pet=pet3, job_type='pet_walker', owner=owner1, isCompleted=False)
    job4 = Job(arrival_time=int(datetime.datetime(2024, 8, 28, 12, 0).timestamp()), worker=worker4, pet=pet4, job_type='pet_sitter', owner=owner4, isCompleted=False)
    job5 = Job(arrival_time=int(datetime.datetime(2024, 8, 29, 13, 0).timestamp()), worker=worker5, pet=pet5, job_type='pet_sitter', owner=owner5, isCompleted=False)
    db.session.add_all([job1, job2, job3, job4, job5])
    db.session.commit()
