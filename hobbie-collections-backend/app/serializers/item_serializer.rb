class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :owned, :hobby_id
  belongs_to :hobby
end
