require "test_helper"

class HobbiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @hobby = hobbies(:one)
  end

  test "should get index" do
    get hobbies_url, as: :json
    assert_response :success
  end

  test "should create hobby" do
    assert_difference('Hobby.count') do
      post hobbies_url, params: { hobby: { name: @hobby.name } }, as: :json
    end

    assert_response 201
  end

  test "should show hobby" do
    get hobby_url(@hobby), as: :json
    assert_response :success
  end

  test "should update hobby" do
    patch hobby_url(@hobby), params: { hobby: { name: @hobby.name } }, as: :json
    assert_response 200
  end

  test "should destroy hobby" do
    assert_difference('Hobby.count', -1) do
      delete hobby_url(@hobby), as: :json
    end

    assert_response 204
  end
end
