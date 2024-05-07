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
end
