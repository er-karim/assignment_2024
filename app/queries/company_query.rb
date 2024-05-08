class CompanyQuery
  RECORDS_PER_PAGE = 10

  def initialize(params_page, company_params)
    @params_page = params_page
    @company_params = company_params
  end

  def filter_with_deals
    companies = Company.includes(:deals)
                       .select('companies.*, COALESCE(SUM(deals.amount), 0) AS total_deal_amount')
                       .joins('LEFT JOIN deals ON deals.company_id = companies.id')
                       .group('companies.id')
                       .order(created_at: :desc)

    companies = apply_filters(companies)

    companies.paginate(page: @params_page, per_page: RECORDS_PER_PAGE)
  end

  private

  def apply_filters(companies)
    companies = filter_by_name(companies)
    companies = filter_by_industry(companies)
    companies = filter_by_employee_count(companies)
    filter_by_minimum_deal_amount(companies)
  end

  def filter_by_name(companies)
    return companies unless @company_params[:name].present?

    companies.where('companies.name LIKE ?', "%#{@company_params[:name]}%")
  end

  def filter_by_industry(companies)
    return companies unless @company_params[:industry].present?

    companies.where('companies.industry LIKE ?', "%#{@company_params[:industry]}%")
  end

  def filter_by_employee_count(companies)
    return companies unless @company_params[:employee_count].present?

    companies.having('employee_count >= :employee_count',
                     employee_count: @company_params[:employee_count])
  end

  def filter_by_minimum_deal_amount(companies)
    return companies unless @company_params[:minimum_deal_amount].present?

    companies.having('total_deal_amount >= :minimum_deal_amount',
                     minimum_deal_amount: @company_params[:minimum_deal_amount])
  end
end
