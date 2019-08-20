from django.db import models


# Create your models here.

class Book(models.Model):
    isbn = models.CharField(max_length=10)
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    def as_dict(self):
        return {
            'isbn':self.isbn,
            'title':self.title
        }

