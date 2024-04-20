from django.db import models

class Works(models.Model):
    title = models.CharField(max_length=20)
    url = models.URLField(blank=True)
    status = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class WorksTage(models.Model):
    works = models.ForeignKey(Works, on_delete=models.CASCADE, related_name='WorksTage')
    name = models.CharField(max_length=5)

    def __str__(self):
        return self.name