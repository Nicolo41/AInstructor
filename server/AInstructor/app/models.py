from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid
from django.core import validators
from django.core.exceptions import ValidationError
from django.core.validators import validate_image_file_extension, RegexValidator
import os

# Create your models here.

AlphanumericValidator = RegexValidator(r'^[0-9a-zA-Z]*$', 'Only alphanumeric characters are allowed.')
AlphanumericValidatorPlus = RegexValidator(r'^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$', 'The password must contain different case, number, and special character')


class CustomUser(AbstractUser):
    pass
    # add additional fields in here
    profil_picture = models.ImageField( max_length = 254,null = True, blank = True, validators = [validate_image_file_extension]) #add uplad to
    is_teacher = models.BooleanField(default = 'False')
    last_connexion = models.DateField(auto_now=True, auto_now_add=False, null = True)
    jwt = models.CharField(max_length=500, null = True, default=0, help_text="dictionnaire de la forme suivante : 'token' : "", 'exp'   :"" ")

    def __str__(self):
        return self.username


# class CustomUser(models.Model):
#     #user = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) # unique=True
#     #first_name = models.CharField(max_length=30, validators= [AlphanumericValidator], blank = True)
#     #last_name = models.CharField(max_length=30,validators= [AlphanumericValidator])
#     #profil_picture = models.ImageField( max_length = 254,null = True, blank = True, validators = [validate_image_file_extension]) #add uplad to
#     #mail = models.EmailField(max_length=254)
#     #password = models.CharField(max_length = 254)           #Password validation settings
#     #is_teacher = models.BooleanField(default = 'False', help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.')
#     date_creation = models.DateField(auto_now=False, auto_now_add=True, null = True)
#     last_connexion = models.DateField(auto_now=True, auto_now_add=False, null = True)

#     def __str__(self):
#         # return self.mail
    
class Groupe(models.Model):
    group_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    name = models.CharField(max_length=30, validators= [AlphanumericValidator])
    user = models.ManyToManyField(CustomUser)


def upload_to_cours(instance, filename):
    return f'cours/{instance.course_id}/{filename}'


class Course(models.Model):
    course_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=127, validators= [AlphanumericValidator], default = "New Course",  blank = True)
    theme = models.CharField(max_length=127, validators= [AlphanumericValidator],  default = "Theme",  blank = True)
    uploaded_file = models.FileField(upload_to=upload_to_cours, storage=None, max_length=100)
    uploaded_by = models.ForeignKey(CustomUser, on_delete = models.RESTRICT, null = True, blank = True) 

    def __str__(self):
        return self.name

def generate_unique_filename(instance, filename):
    extension = filename.split('.')[-1] 
    random_name = str(uuid.uuid4()) 
    return os.path.join({instance.course_id}/'course_files/', random_name + '.' + extension)

class Image(models.Model):
    course_id =models.ForeignKey(Course, on_delete=models.RESTRICT, related_name='images')
    image = models.ImageField(upload_to=generate_unique_filename)
    


# class Text(models.Model):
#     course =models.ForeignKey(Course, on_delete=models.RESTRICT, related_name='text')
#     text =  models.TextField(null =True,  blank = True)
#     text_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     jwt = models.CharField(max_length=256, null = True, default=0)

class Quesionnaire(models.Model):
    questionnaire_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ManyToManyField(Course)  
    temporaire = models.BooleanField(default = False, null = True)
    date_end = models.DateField(auto_now=False, auto_now_add=False, null = True)
    date_creation = models.DateField(auto_now=True, auto_now_add=False, null = True)
    title = models.CharField(max_length=127, validators= [AlphanumericValidator], default = "New test",  blank = True)
    description = models.CharField(max_length=254, validators= [AlphanumericValidator], default = "description : ", null = True,  blank = True)
    theme = models.CharField(max_length=127, validators= [AlphanumericValidator], null = True,  blank = True)
    score = models.SmallIntegerField(default = 0, null = True)
    nbr_question_total = models.PositiveSmallIntegerField(default = 0, null = True)
    nbr_QCM = models.PositiveSmallIntegerField(default = 0, null = True)
    difficulty = models.CharField(max_length = 254, null = True, blank = True)  
    editable_by = models.ForeignKey(CustomUser, on_delete = models.CASCADE, related_name='editableBy', blank = True)  
    sign_in = models.ManyToManyField(CustomUser)

    
    def __str__(self):
        return self.title


class Question(models.Model):
    question_id =  models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question_ouverte = "QO"
    question_choix_multiple = "QCM"
    Type_Question_Choice = [
        (question_choix_multiple, "question à choix multiples"),
        (question_ouverte , "question ouverte")
        ]

    type_question = models.CharField(max_length = 3, choices = Type_Question_Choice, default = question_ouverte)
    statement = models.TextField(null = True)
    questionnaire = models.ForeignKey(Quesionnaire, on_delete = models.RESTRICT, null = True)

    
    def __str__(self):
        return self.statement,self.type_question
    
class Response(models.Model):
    response_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable =False)
    response_user = models.TextField(null = True,  blank = True)
    correction = models.BooleanField(default = False)
    user_id = models.ForeignKey(CustomUser, on_delete = models.RESTRICT, null = True)
    question = models.ForeignKey(Quesionnaire, on_delete = models.RESTRICT, null = True)


    
    def __str__(self):
        return self.response_user


