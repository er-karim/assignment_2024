require 'rails_helper'

RSpec.describe '/api/v1/companies', type: :request do
  describe 'GET #index' do
    subject(:index_request) { get '/api/v1/companies', params: }

    let(:params) { { company: { employee_count: '10' }, page: 1 } }

    context 'when there are companies with deals' do
      let!(:companies) do
        create_list(:company, 10, :with_deals)
      end

      it 'returns a success response' do
        index_request
        expect(response).to have_http_status(:success)
      end

      it 'returns companies with deals matching the filter' do
        index_request
        expect(json_response['data'].size).to eq(10)
      end

      it 'returns the correct total pages in the meta data' do
        index_request
        expect(json_response['meta']['total_pages']).to be >= 1
      end
    end

    context 'when there are no companies with deals' do
      it 'returns a success response' do
        index_request
        expect(response).to have_http_status(:success)
      end

      it 'returns an empty array for data' do
        index_request
        expect(json_response['data']).to be_empty
      end

      it 'returns total pages as 1' do
        index_request
        expect(json_response['meta']['total_pages']).to eq(1)
      end
    end
  end
end
