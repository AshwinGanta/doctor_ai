from django.db import models


class DiagnosisReport(models.Model):

    symptoms = models.TextField()

    condition = models.CharField(
        max_length=100
    )

    diagnosis = models.TextField()

    specialist = models.CharField(
        max_length=100
    )

    severity = models.CharField(
        max_length=30
    )

    urgency = models.CharField(
        max_length=30
    )

    confidence = models.IntegerField()

    first_aid = models.TextField()

    tests = models.JSONField(
        default=list
    )

    medicines = models.JSONField(
        default=list
    )

    home_remedies = models.JSONField(
        default=list
    )

    address = models.CharField(
        max_length=300,
        blank=True
    )

    pincode = models.CharField(
        max_length=20,
        blank=True
    )

    hospital_names = models.JSONField(
        default=list
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return self.condition
