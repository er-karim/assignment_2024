class Api::V1::CompaniesController < ApplicationController
  RECORDS_PER_PAGE = 10

  def index
    companies = CompanyQuery.new(Company.includes(:deals))
                            .filter_with_minimum_deal_amount(company_params)
                            .paginate(page:, per_page: RECORDS_PER_PAGE)

    total_pages = companies.total_pages

    render json: { data: companies.as_json(include: :deals), meta: { total_pages: } }, status: :ok
  end

  private

  def page
    [params[:page].to_i, 1].max
  end

  def company_params
    params.require(:company).permit(:name, :employee_count, :industry, :minimum_deal_amount)
  end
end
