class Api::V1::CompaniesController < ApplicationController
  def index
    companies = CompanyQuery.new(page, company_params).filter_with_deals
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
