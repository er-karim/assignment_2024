class CompanyQuery
  attr_reader :relation

  def initialize(relation = Company.all)
    @relation = relation
  end

  def filter_with_minimum_deal_amount(filters)
    companies_woth_deals = relation_with_deals
                           .select('companies.*, COALESCE(SUM(deals.amount), 0) AS total_deal_amount')
                           .group('companies.id')
                           .order(created_at: :desc)

    if filters.blank? || (!filters.is_a?(Hash) && !filters.is_a?(ActionController::Parameters))
      return companies_woth_deals
    end

    companies_woth_deals = companies_woth_deals.by_name(filters[:name])
                                               .by_industry(filters[:industry])
                                               .by_employee_count(filters[:employee_count])

    by_minimum_deal_amount(filters[:minimum_deal_amount], companies_woth_deals)
  end

  private

  def relation_with_deals
    relation
      .joins('LEFT JOIN deals ON deals.company_id = companies.id')
  end

  def by_minimum_deal_amount(minimum_deal_amount, companies_woth_deals)
    return companies_woth_deals unless minimum_deal_amount.present?

    companies_woth_deals.having('COALESCE(SUM(deals.amount), 0) >= ?', minimum_deal_amount)
  end
end
