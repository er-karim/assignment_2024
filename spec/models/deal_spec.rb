require 'rails_helper'

RSpec.describe Deal, type: :model do
  describe 'Associations' do
    it { should belong_to(:company) }
  end

  describe 'Validations' do
    it { should validate_presence_of(:name) }
    it do
      should define_enum_for(:status)
        .with_values(
          pending: 'pending',
          won: 'won',
          lost: 'lost'
        )
        .backed_by_column_of_type(:string)
    end
  end
end
