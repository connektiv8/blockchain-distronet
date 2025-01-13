'''
Copyright (c) 2025 Connektiv8 LLC
Apache License 2.0
-------------------------------------------------------------------------
File: c:\localdev\crypto\blockchain-distronet\backend\api\apps.py
 
Author: Christian Bannard
Created: 2025-01-12
-------------------------------------------------------------------------
HISTORY:
Date      	By	Comments
----------	---	---------------------------------------------------------
2025-01-12	CEB	Initial file creation

'''


from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"
