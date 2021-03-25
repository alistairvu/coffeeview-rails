require "test_helper"

class CafesControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get cafes_create_url
    assert_response :success
  end

  test "should get show" do
    get cafes_show_url
    assert_response :success
  end

  test "should get update" do
    get cafes_update_url
    assert_response :success
  end

  test "should get delete" do
    get cafes_delete_url
    assert_response :success
  end
end
