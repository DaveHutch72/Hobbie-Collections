class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :owned, :hobby_id
end
