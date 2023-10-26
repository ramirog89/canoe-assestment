from rest_framework.test import APITestCase

from src.app.models import Event, EventType, Fund
from src.app.services.fund.tasks import fund_created

from .factories import FundFactory, FundManagerFactory, FundAliasFactory

class TestFundTasks(APITestCase):

    def test_should_create_duplicated_event_when_matching_fund_name(self):
        f_1 = FundFactory(name="Existing Fund")
        newFund = FundFactory(name="Existing Fund")

        # When
        fund_created(fund_id=newFund.id, fund_name=newFund.name)

        matchFund = Fund.objects.get(pk=newFund.pk)

        events = Event.objects.filter(type=EventType.DUPLICATE_FUND_WARNING)
        self.assertEquals(matchFund.is_duplicated, True)
        self.assertEquals(len(events), 1)

    def test_should_create_duplicated_event_matching_alias_and_manager(self):

        fundManager = FundManagerFactory()
        # Setup
        f_1 = FundFactory(manager=fundManager)
        f_2 = FundFactory(manager=fundManager)
        f_3 = FundFactory()
        f_4 = FundFactory()
        f_5 = FundFactory()
        f_6 = FundFactory()
        f_7 = FundFactory()
        f_8 = FundFactory(is_duplicated=True)

        fundAlias_1_1 = FundAliasFactory(fund=f_1, alias='equal to')
        fundAlias_1_2 = FundAliasFactory(fund=f_1)
        fundAlias_1_3 = FundAliasFactory(fund=f_1)

        fundAlias_2_1 = FundAliasFactory(fund=f_2, alias='equal to')
        fundAlias_2_2 = FundAliasFactory(fund=f_2)
        fundAlias_2_3 = FundAliasFactory(fund=f_2)

        newFund = FundFactory(manager=fundManager)

        fundAlias_3_1 = FundAliasFactory(fund=newFund, alias='equal to')
        fundAlias_3_2 = FundAliasFactory(fund=newFund)
        fundAlias_3_3 = FundAliasFactory(fund=newFund)

        # When
        fund_created(fund_id=newFund.id, fund_name=newFund.name)

        matchFund = Fund.objects.get(pk=newFund.pk)

        events = Event.objects.filter(type=EventType.DUPLICATE_FUND_WARNING)
        self.assertEquals(matchFund.is_duplicated, True)
        self.assertEquals(len(events), 1)

    def test_should_create_unique_fund(self):

        fundManager = FundManagerFactory()
        # Setup
        f_1 = FundFactory(manager=fundManager)
        f_2 = FundFactory(manager=fundManager)
        f_3 = FundFactory()
        f_8 = FundFactory(is_duplicated=True)

        fundAlias_1_1 = FundAliasFactory(fund=f_1)
        fundAlias_1_2 = FundAliasFactory(fund=f_1)
        fundAlias_1_3 = FundAliasFactory(fund=f_1)

        fundAlias_2_1 = FundAliasFactory(fund=f_2)
        fundAlias_2_2 = FundAliasFactory(fund=f_2)
        fundAlias_2_3 = FundAliasFactory(fund=f_2)

        newFund = FundFactory(manager=fundManager)

        fundAlias_3_1 = FundAliasFactory(
            alias="Unique alias 1",
            fund=newFund
        )
        fundAlias_3_2 = FundAliasFactory(
            alias="Unique alias 2",
            fund=newFund
        )
        fundAlias_3_3 = FundAliasFactory(
            alias="Unique alias 3",
            fund=newFund
        )

        # When
        fund_created(fund_id=newFund.id, fund_name=newFund.name)

        matchFund = Fund.objects.get(pk=newFund.pk)

        events = Event.objects.filter(type=EventType.DUPLICATE_FUND_WARNING)
        self.assertEquals(matchFund.is_duplicated, False)
        self.assertEquals(len(events), 0)
