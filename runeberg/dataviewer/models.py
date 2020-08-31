from django.db import models

# Create your models here.


class Assets(models.Model):
    assetid = models.AutoField(db_column='AssetId', primary_key=True)  # Field name made lowercase.
    assetname = models.CharField(db_column='AssetName', max_length=255)  # Field name made lowercase.
    assetdisplayname = models.CharField(db_column='AssetDisplayName', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'assets'


class HistoricData(models.Model):
    dataid = models.AutoField(db_column='DataId', primary_key=True)  # Field name made lowercase.
    asofdate = models.DateField(db_column='AsOfDate')  # Field name made lowercase.
    assetid = models.ForeignKey(Assets, models.DO_NOTHING, db_column='AssetId')  # Field name made lowercase.
    datatype = models.CharField(db_column='DataType', max_length=255)  # Field name made lowercase.
    datavalue = models.DecimalField(db_column='DataValue', max_digits=18, decimal_places=2, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'historic_data'


class Indices(models.Model):
    indexid = models.AutoField(db_column='IndexId', primary_key=True)  # Field name made lowercase.
    indexname = models.CharField(db_column='IndexName', max_length=255)  # Field name made lowercase.
    indexdisplayname = models.CharField(db_column='IndexDisplayName', max_length=255)  # Field name made lowercase.
    isincluded = models.BooleanField(db_column='IsIncluded')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'indices'
