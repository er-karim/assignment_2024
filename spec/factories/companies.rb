FactoryBot.define do
  factory :company do
    name { Faker::Company.name }
    industry { Faker::Company.industry }
    employee_count { rand(10..1000) }

    trait :with_deals do
      transient do
        deals_count { 1 }
        deal_amount { rand(10..1000) }
      end

      after(:create) do |company, evaluator|
        create_list(:deal, evaluator.deals_count, company:, amount: evaluator.deal_amount)
      end
    end
  end
end
