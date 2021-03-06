class Api::EventsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def new 
        @event = Event.new
    end 

    def index 
        @events = Event.all 
        render :index
    end 

    def show
        @event = Event.find_by(id: params[:id])
    end 

    def create
        @event = Event.new(event_params)
        if @event.save 
            Rsvp.create(
                user_id: params[:event][:creator_id], 
                event_id: @event.id)
            render :show 
        else 
            render json: @event.errors.full_messages, status: 422
        end 
    end 

    def update 
        @event = Event.find_by(id: params[:id])
        if @event.update(event_params)
            render :show
        else 
            render json: @event.errors.full_messages, status: 422
        end
    end 

    def destroy
        @event = Event.find_by(id: params[:id])
        @event.destroy
        render :show
    end 

    def event_params
        params.require(:event).permit(
            :creator_id,
            :group_id, 
            :title,
            :details,
            :location,
            :start_date,
            :end_date, 
        )
    end 

end
