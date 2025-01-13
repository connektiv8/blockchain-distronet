'''
Copyright (c) 2025 Connektiv8 LLC
Apache License 2.0
-------------------------------------------------------------------------
File: c:\localdev\crypto\blockchain-distronet\backend\users\models.py
 
Author: Christian Bannard
Created: 2025-01-12
-------------------------------------------------------------------------
HISTORY:
Date      	By	Comments
----------	---	---------------------------------------------------------
2025-01-12	CEB	Inital file creation

'''

from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """Custom user model for blockchain-distronet"""
    wallet_address = models.CharField(max_length=42, unique=True, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.username or self.wallet_address