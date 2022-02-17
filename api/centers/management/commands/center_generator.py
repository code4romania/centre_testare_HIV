import random
from time import sleep

from django.conf import settings
from django.core.management.base import BaseCommand
from faker import Faker
from tqdm import trange

from centers.models import CenterRating
from centers.models import CenterTestTypes
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
                pk__in=list(TestingCenter.objects.values_list("pk", flat=True)[: int(options["total_testing_centers"])])
            ).delete()
            self.stdout.write(
                self.style.SUCCESS(f"Successfully deleted {int(testing_centers_count)} testing_center(s).")
            )
        elif options["create"]:
            available_test_types = CenterTestTypes.objects.all()
            available_test_types = [test_type.pk for test_type in available_test_types]
            center_test_types_count = random.randint(1, len(available_test_types))

            letters_lower = [chr(i) for i in range(ord("a"), ord("z") + 1)]
            letters_upper = [chr(i) for i in range(ord("A"), ord("Z") + 1)]
            letters = letters_lower + letters_upper + [""]

            testing_center_id = 0
            total_ratings = 0
            for testing_center_id in trange(int(options["total_testing_centers"])):
                status = random.choice(["-1", "0", "1"])
                street_number = f"{random.randint(1, 300)}{random.choice(letters)}"
                street_name = fake.address()
                county = random.choice(list(settings.COUNTIES_SHORTNAME.keys()))
                locality = fake.city()
                lat = random.uniform(43.4, 48.15)
                lng = random.uniform(20.19, 29.4)
                website = fake.url()
                phone_number = fake.phone_number()
                schedule = fake.text()

                new_testing_center = TestingCenter.objects.create(
                    status=status,
                    street_number=street_number,
                    street_name=street_name,
                    county=county,
                    locality=locality,
                    lat=lat,
                    lng=lng,
                    website=website,
                    phone_number=phone_number,
                    schedule=schedule[:20],
                )

                test_types = [random.choice(available_test_types) for _ in range(center_test_types_count)]
                new_testing_center.test_types.set(test_types)

                new_testing_center.save()

                num_ratings = random.randint(0, 40)
                for _ in range(num_ratings):
                    new_testing_center.ratings.create(
                        rating=random.randint(CenterRating.MIN_VALUE, CenterRating.MAX_VALUE),
                        comment=fake.text()[:1000],
                    )
                total_ratings += num_ratings
                sleep(0.01)
            self.stdout.write(
                self.style.SUCCESS(
                    f"Successfully created {testing_center_id + 1} testing_center(s) and {total_ratings} rating(s)."
                )
            )
        else:
            self.stdout.write(self.style.ERROR("Missing required argument: --create or --delete"))
            self.stdout.write(
                self.style.SUCCESS(
                    f"Try: python manage.py centers {int(options['total_testing_centers'])} --create"
                )
            )
