from unittest.mock import patch
from rest_framework import status
from rest_framework.test import APITestCase

from .factories import Fund, FundFactory, FundManagerFactory


class TestFunds(APITestCase):

    def test_get_funds(self):
        # Setup
        FundFactory()
        FundFactory()
        FundFactory()
        FundFactory(is_duplicated=True)

        # When
        response = self.client.get('/fund', format='json')

        # Assert
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['total'], 4)

        # When filter by duplicates
        response = self.client.get('/fund?filter=duplicates', format='json')

        # Assert only 1 record
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['total'], 1)

    @patch('src.app.services.fund.process.fund_created.apply_async')
    def test_create_fund(self, fund_create_mock):
        # Setup
        fundManager = FundManagerFactory()

        # When
        response = self.client.post(
            '/fund',
            data={
                'name': 'foo+fund',
                'start_year': '2023-12-18',
                'alias': ['alias 1', 'alias 2'],
                'manager': fundManager.pk,
            },
            format='json'
        )

        # Assert
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        fund_create_mock.assert_called_once()

    def test_update_fund(self):
        # Setup
        fund = FundFactory()

        # When
        response = self.client.put(
            f'/fund/{fund.id}',
            data={
                'name': 'edited-fund',
                'start_year': '2023-12-18',
                'alias': ['alias 1', 'alias 2']
            },
            format='json'
        )

        # Assert
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json()['name'], 'edited-fund')
        self.assertEquals(response.json()['start_year'], '2023-12-18')

    def test_delete_fund(self):
        # Setup
        fund_1 = FundFactory()
        fund_2 = FundFactory()

        all_funds = Fund.objects.all()
        self.assertEquals(len(all_funds), 2)

        # When
        response = self.client.delete(
            f'/fund/{fund_2.id}',
            format='json'
        )

        all_funds = Fund.objects.all()

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(len(all_funds), 1)
