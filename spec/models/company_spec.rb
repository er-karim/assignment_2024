require 'rails_helper'

RSpec.describe Company, type: :model do
  describe 'Associations' do
    it { should have_many(:deals) }
  end

  describe 'Validations' do
    subject { build(:company) }

    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:industry) }
    it { should validate_uniqueness_of(:name).scoped_to(:industry).case_insensitive }
  end

  describe 'scopes' do
    describe '.by_name' do
      it 'filters companies by name' do
        company_with_matching_name = create(:company, name: 'Matching Company')
        create(:company, name: 'Another Company')

        expect(Company.by_name('Matching')).to eq([company_with_matching_name])
      end

      it 'returns all companies if name is nil' do
        companies = create_list(:company, 3)

        expect(Company.by_name(nil)).to eq(companies)
      end
    end

    describe '.by_industry' do
      it 'filters companies by industry' do
        company_with_matching_industry = create(:company, industry: 'Technology')
        create(:company, industry: 'Finance')

        expect(Company.by_industry('Technology')).to eq([company_with_matching_industry])
      end

      it 'returns all companies if industry is nil' do
        companies = create_list(:company, 3)

        expect(Company.by_industry(nil)).to eq(companies)
      end
    end

    describe '.by_employee_count' do
      it 'filters companies by employee count' do
        company_with_matching_employee_count = create(:company, employee_count: 100)
        create(:company, employee_count: 50)

        expect(Company.by_employee_count(80)).to eq([company_with_matching_employee_count])
      end

      it 'returns all companies if employee count is nil' do
        companies = create_list(:company, 3)

        expect(Company.by_employee_count(nil)).to eq(companies)
      end
    end
  end
end
