require 'rails_helper'

RSpec.describe CompanyQuery, type: :query do
  let(:company_params) { {} }

  describe '#filter_with_deals' do
    subject(:filtered_companies) { described_class.new(1, company_params).filter_with_deals }

    context 'when no filters are applied' do
      it 'returns all companies with deals' do
        create_list(:company, 10, :with_deals)
        expect(filtered_companies.length).to eq(10)
      end
    end

    context 'when filtering by company name' do
      let(:company_params) { { name: 'Test' } }

      it 'returns companies with matching name' do
        create(:company, :with_deals, name: 'Test Company')
        create(:company, :with_deals, name: 'Another Company')
        expect(filtered_companies.length).to eq(1)
        expect(filtered_companies.first.name).to eq('Test Company')
      end
    end

    context 'when filtering by employee count' do
      let(:company_params) { { employee_count: 50 } }

      it 'returns companies with specified employee count or more' do
        create(:company, :with_deals, employee_count: 100)
        create(:company, :with_deals, employee_count: 30)
        expect(filtered_companies.length).to eq(1)
        expect(filtered_companies.first.employee_count).to be >= 50
      end
    end

    context 'when filtering by industry' do
      let(:company_params) { { industry: 'Technology' } }

      it 'returns companies with matching industry' do
        create(:company, :with_deals, industry: 'Technology')
        create(:company, :with_deals, industry: 'Finance')
        expect(filtered_companies.length).to eq(1)
        expect(filtered_companies.first.industry).to eq('Technology')
      end
    end

    context 'when filtering by minimum deal amount' do
      let(:company_params) { { minimum_deal_amount: 500 } }

      it 'returns companies with total deal amount greater than or equal to specified amount' do
        create(:company, :with_deals, deals_count: 1, deal_amount: 300)
        create(:company, :with_deals, deals_count: 2, deal_amount: 700)
        expect(filtered_companies.length).to eq(1)
        expect(filtered_companies.first.total_deal_amount).to be >= 500
      end
    end

    context 'when applying all filters' do
      let(:company_params) do
        {
          name: 'Test',
          employee_count: 50,
          industry: 'Technology',
          minimum_deal_amount: 500
        }
      end

      it 'returns companies matching all filter criteria' do
        create(:company, :with_deals, name: 'Test Company', employee_count: 60, industry: 'Technology', deals_count: 2,
                                      deal_amount: 400)
        create(:company, :with_deals, name: 'Another Company', employee_count: 40, industry: 'Finance', deals_count: 1,
                                      deal_amount: 300)
        create(:company, :with_deals, name: 'Test ABC', employee_count: 70, industry: 'Technology', deals_count: 1,
                                      deal_amount: 200)
        expect(filtered_companies.length).to eq(1)
        expect(filtered_companies.first.name).to eq('Test Company')
      end
    end
  end
end
