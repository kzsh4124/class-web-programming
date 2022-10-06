
class Person
    def initialize(name, addr, tel)
      @name = name
      @addr = addr
      @tel = tel
    end

    def get_name
        return @name
    end
end

suzuki = Person.new("鈴木太郎", "大阪市", "080...")
puts suzuki.get_name