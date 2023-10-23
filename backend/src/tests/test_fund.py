from rest_framework import status
from rest_framework.test import APITestCase

from .factories import Fund, FundFactory, CompanyFactory, ManagerFactory


class TestFunds(APITestCase):

    def test_get_funds(self):
        # Setup
        FundFactory()
        FundFactory()
        FundFactory()

        # When
        response = self.client.get(
            '/fund',
            format='json'
        )

        # Assert
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json(), {})

    def test_create_fund(self):
        # Setup
        CompanyFactory()
        ManagerFactory()

        # When
        response = self.client.post(
            '/fund',
            data={
                'name': 'foo',
                'email': 'bar@example.com',
                'password': 'Little123',
            },
            format='json'
        )

        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        self.assertEquals(response.json(), {})

    def test_update_fund(self):
        # Setup
        fund = FundFactory()

        # When
        response = self.client.put(
            f'/fund/{fund.id}',
            data={
                'name': 'foo',
                'email': 'bar@example.com',
                'password': 'Little123',
            },
            format='json'
        )

        # Assert
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.json(), {})

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

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEquals(len(all_funds), 1)
