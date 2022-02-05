import random
from time import sleep

from django.core.management.base import BaseCommand
from faker import Faker
from tqdm import trange

from centers.models import TestingCenter

fake = Faker("ro_RO")


class Command(BaseCommand):

    help = "generate X number of Fake TestingCenters"

    def add_arguments(self, parser):
        parser.add_argument("total_testing_centers", type=int, help="How many testing centers to create")
        parser.add_argument(
            "--delete",
            action="store_true",
            help="Delete testing centers",
        )
        parser.add_argument(
            "--create",
            action="store_true",
            help="Create new fake testing centers",
        )

    def handle(self, *args, **options):
        if options["delete"]:
            testing_centers_count = TestingCenter.objects.count()
            TestingCenter.objects.filter(
                pk__in=list(
                    TestingCenter.objects.values_list("pk", flat=True)[: int(options["total_testing_centers"])]
                )
            ).delete()
            self.stdout.write(
                self.style.SUCCESS("Successfully deleted %s testing_center(s)." % (int(testing_centers_count)))
            )
        elif options["create"]:
            testing_center_id = 0
            for testing_center_id in trange(int(options["total_testing_centers"])):
                street_name = fake.address()
                risk_category = random.choice(["NA", "U1", "U2", "U3", "U4", "RS1", "RS2", "RS3", "RS4"])
                county = random.choice(
                    [
                        "Bucharest",
                        "Iasi",
                        "Constanta",
                        "Cluj",
                        "Timisoara",
                        "Brasov",
                        "Sibiu",
                    ]
                )
                street_number = random.choice(["1", "3", "4", "23", "77T", "179", "23a"])
                locality = random.choice(["1", "2", "3", "4", "5", "6"])
                status = random.choice(["-1", "0", "1"])
                certified_expert = fake.first_name() + " " + fake.last_name()
                examination_year = fake.date("%Y")
                lat = fake.latitude()
                lng = fake.longitude()
                year_built = fake.date("%Y")
                apartment_count = fake.random_int(min=0, max=199)

                new_testing_center = TestingCenter.objects.create(
                    street_name=street_name,
                    risk_category=risk_category,
                    county=county,
                    street_number=street_number,
                    locality=locality,
                    status=status,
                    certified_expert=certified_expert,
                    examination_year=examination_year,
                    lat=lat,
                    lng=lng,
                    year_built=year_built,
                    apartment_count=apartment_count,
                )

                new_testing_center.save()
                sleep(0.01)
            self.stdout.write(
                self.style.SUCCESS("Successfully created %s testing_center(s)." % (testing_center_id + 1))
            )
        else:
            self.stdout.write(self.style.ERROR("Missing required argument: --create or --delete"))
            self.stdout.write(
                self.style.SUCCESS(
                    "Try: python manage.py centers %s --create" % (int(options["total_testing_centers"]))
                )
            )
