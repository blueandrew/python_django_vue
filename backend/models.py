from django.db import models

class Works(models.Model):
    title = models.CharField(max_length=20)
    url = models.URLField(blank=True)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Works:
        db_table = "works"